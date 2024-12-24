import { Wallet } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
export declare class IMTokenWallet extends MainWalletBase {
    constructor(walletInfo: Wallet);
    initClient(): Promise<void>;
}
