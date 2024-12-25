import { Logger, State, WalletManager } from '@cosmos-kit/core';
import { createContext, useEffect, useMemo, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const walletContext = createContext(null);
export function ChainProvider({ chains, assetLists, wallets, walletModal: ProvidedWalletModal, throwErrors = false, subscribeConnectEvents = true, defaultNameService = 'icns', walletConnectOptions, signerOptions, endpointOptions, sessionOptions, logLevel = 'WARN', allowedIframeParentOrigins = [
    'http://localhost:*',
    'https://localhost:*',
    'https://app.osmosis.zone',
    'https://daodao.zone',
    'https://dao.daodao.zone',
    'https://my.abstract.money',
    'https://apps.abstract.money',
    'https://console.abstract.money',
], children, }) {
    const logger = useMemo(() => new Logger(logLevel), []);
    const [isViewOpen, setViewOpen] = useState(false);
    const [viewWalletRepo, setViewWalletRepo] = useState();
    const [data, setData] = useState();
    const [state, setState] = useState(State.Init);
    const [msg, setMsg] = useState();
    const [, setClientState] = useState(State.Init);
    const [, setClientMsg] = useState();
    const [render, forceRender] = useState(0);
    logger.debug('[provider.tsx] data:', data);
    logger.debug('[provider.tsx] state:', state);
    logger.debug('[provider.tsx] message:', msg);
    const [walletManager, setWalletManager] = useState();
    useEffect(() => {
        const walletManager = new WalletManager(chains, wallets, logger, throwErrors, subscribeConnectEvents, allowedIframeParentOrigins, assetLists, defaultNameService, walletConnectOptions, signerOptions, endpointOptions, sessionOptions);
        walletManager.setActions({
            viewOpen: setViewOpen,
            viewWalletRepo: setViewWalletRepo,
            data: setData,
            state: setState,
            message: setMsg,
        });
        walletManager.walletRepos.forEach((wr) => {
            wr.setActions({
                viewOpen: setViewOpen,
                viewWalletRepo: setViewWalletRepo,
                render: forceRender,
            });
            wr.wallets.forEach((w) => {
                w.setActions({
                    data: setData,
                    state: setState,
                    message: setMsg,
                });
            });
        });
        walletManager.mainWallets.forEach((w) => {
            w.setActions({
                data: setData,
                state: setState,
                message: setMsg,
                clientState: setClientState,
                clientMessage: setClientMsg,
            });
        });
        setWalletManager(walletManager);
    }, []);
    useEffect(() => {
        walletManager && walletManager.onMounted();
        return () => {
            setViewOpen(false);
            walletManager && walletManager.onUnmounted();
        };
    }, [render, walletManager]);
    if (!walletManager)
        return null;
    return (_jsxs(walletContext.Provider, { value: { walletManager, modalProvided: Boolean(ProvidedWalletModal) }, children: [ProvidedWalletModal && (_jsx(ProvidedWalletModal, { isOpen: isViewOpen, setOpen: setViewOpen, walletRepo: viewWalletRepo })), children] }));
}
