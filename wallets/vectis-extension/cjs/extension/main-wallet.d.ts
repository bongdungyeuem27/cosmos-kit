import { Wallet } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
export declare class VectisExtensionWallet extends MainWalletBase {
    constructor(walletInfo: Wallet);
    initClient(): Promise<void>;
}
