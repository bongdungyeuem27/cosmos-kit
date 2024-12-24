import { wallets as keplrExtension } from '@cosmos-kit/keplr-extension';
import { wallets as keplrMobile } from '@cosmos-kit/keplr-mobile';
export function createWalletList(extension, mobile, snap) {
    const list = [extension, mobile, snap].filter((wallet) => Boolean(wallet));
    list.mobile = mobile;
    list.extension = extension;
    return list;
}
export const keplr = createWalletList(keplrExtension[0], keplrMobile[0]);
export function defineGetters(wallets) {
    return Object.defineProperties(wallets, {
        mobile: {
            get() {
                return this.filter((wallet) => wallet.isModeWalletConnect);
            },
        },
        extension: {
            get() {
                return this.filter((wallet) => wallet.isModeExtension);
            },
        },
    });
}
export function createAllWalletList(ws) {
    const wallets = ws.slice();
    wallets.keplr = keplr;
    defineGetters(wallets);
    wallets.for = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(names
            .map((name) => wallets.filter((wallet) => wallet.walletInfo.name.startsWith(name)))
            .flat());
    };
    wallets.not = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(wallets.filter((wallet) => !names.some((name) => wallet.walletInfo.name.startsWith(name))));
    };
    return wallets;
}
export const wallets = createAllWalletList([...keplr]);
