import { Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';
export declare class IMTokenWallet extends MainWalletBase {
    constructor(walletInfo: Wallet);
    initClient(): Promise<void>;
}
