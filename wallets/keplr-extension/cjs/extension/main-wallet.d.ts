import { EndpointOptions, MainWalletBase, Wallet } from '@cosmos-kit/core';
export declare class KeplrExtensionWallet extends MainWalletBase {
    constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions['endpoints']);
    initClient(): Promise<void>;
}
