import { COSMIFRAME_KEYSTORECHANGE_EVENT, COSMIFRAME_NOT_CONNECTED_MESSAGE } from '@cosmos-kit/core';
import { Cosmiframe } from '@dao-dao/cosmiframe';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWallet } from './useWallet';
export const useIframe = ({ walletName, metadata, walletClientOverrides, signerOverrides, origins, } = {}) => {
    const wallet = useWallet(walletName).mainWallet;
    const [iframe, setIframe] = useState(null);
    // Memoize these values with refs so the listener always uses their latest
    // values without needing to reset.
    const walletClientOverridesRef = useRef(walletClientOverrides);
    walletClientOverridesRef.current = walletClientOverrides;
    const signerOverridesRef = useRef(signerOverrides);
    signerOverridesRef.current = signerOverrides;
    // Broadcast keystore change event to iframe wallet.
    useEffect(() => {
        const notifyIframe = () => {
            iframe?.contentWindow.postMessage({
                event: COSMIFRAME_KEYSTORECHANGE_EVENT,
            }, '*');
        };
        // Notify inner window of keystore change on any wallet client change
        // (likely either connection or disconnection).
        notifyIframe();
        if (!wallet || typeof window === 'undefined') {
            return;
        }
        // Notify inner window of keystore change on any wallet connect event.
        wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
            window.addEventListener(eventName, notifyIframe);
        });
        wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
            wallet.client?.on?.(eventName, notifyIframe);
        });
        return () => {
            wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
                window.removeEventListener(eventName, notifyIframe);
            });
            wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
                wallet.client?.off?.(eventName, notifyIframe);
            });
        };
    }, [wallet, iframe]);
    // Whenever wallet changes, broadcast keystore change event to iframe wallet.
    useEffect(() => {
        iframe?.contentWindow.postMessage({
            event: COSMIFRAME_KEYSTORECHANGE_EVENT,
        }, '*');
    }, [wallet, iframe]);
    useEffect(() => {
        if (!iframe) {
            return;
        }
        const removeListener = Cosmiframe.listen({
            iframe,
            target: wallet?.client || {},
            getOfflineSignerDirect: wallet?.client.getOfflineSignerDirect.bind(wallet.client) ||
                (() => Promise.reject(COSMIFRAME_NOT_CONNECTED_MESSAGE)),
            getOfflineSignerAmino: wallet?.client.getOfflineSignerAmino.bind(wallet.client) ||
                (() => Promise.reject(COSMIFRAME_NOT_CONNECTED_MESSAGE)),
            nonSignerOverrides: () => ({
                ...walletClientOverridesRef.current,
                // Override connect to return wallet info.
                connect: async (...params) => {
                    if (walletClientOverridesRef.current?.connect) {
                        return await walletClientOverridesRef.current.connect(params[0], params[1]);
                    }
                    else if (wallet?.client?.connect) {
                        await wallet.client.connect(params[0], params[1]);
                    }
                    else {
                        return {
                            type: 'error',
                            error: COSMIFRAME_NOT_CONNECTED_MESSAGE,
                        };
                    }
                },
            }),
            signerOverrides: () => signerOverridesRef.current,
            origins,
            metadata: {
                name: metadata?.name || `${wallet.walletInfo.prettyName} (Outer Wallet)`,
                imageUrl: metadata?.imageUrl ||
                    (wallet.walletInfo.logo
                        ? typeof wallet.walletInfo.logo === 'string'
                            ? wallet.walletInfo.logo
                            : 'major' in wallet.walletInfo.logo
                                ? wallet.walletInfo.logo.major
                                : undefined
                        : undefined),
            },
        });
        return removeListener;
    }, [iframe, wallet, metadata, origins]);
    const iframeRef = useCallback((iframe) => setIframe(iframe), []);
    return {
        wallet,
        iframeRef,
    };
};
