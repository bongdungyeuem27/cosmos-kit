import { MainWalletBase } from '@cosmos-kit/core';
export declare type WalletName = 'keplr';
export declare type WalletList<E extends MainWalletBase | null, M extends MainWalletBase | null> = (E extends MainWalletBase ? M extends MainWalletBase ? [E, M] : [E] : M extends MainWalletBase ? [M] : []) & {
    mobile: M | null;
    extension: E | null;
};
export declare function createWalletList<ExtensionWallet extends MainWalletBase | null, MobileWallet extends MainWalletBase | null, MetaMaskSnap extends MainWalletBase | null>(extension: ExtensionWallet | null, mobile: MobileWallet | null, snap?: MetaMaskSnap): WalletList<ExtensionWallet, MobileWallet>;
export declare const keplr: WalletList<any, any>;
export declare type SubWalletList = MainWalletBase[] & {
    get mobile(): MainWalletBase[];
    get extension(): MainWalletBase[];
};
export declare type AllWalletList = SubWalletList & {
    keplr: typeof keplr;
    for: (...names: WalletName[]) => SubWalletList;
    not: (...names: WalletName[]) => SubWalletList;
};
export declare function defineGetters(wallets: MainWalletBase[]): SubWalletList;
export declare function createAllWalletList(ws: MainWalletBase[]): AllWalletList;
export declare const wallets: AllWalletList;
