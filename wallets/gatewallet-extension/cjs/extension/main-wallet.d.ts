import { Wallet } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
export declare class GatewalletExtensionWallet extends MainWalletBase {
    constructor(walletInfo: Wallet);
    initClient(): Promise<void>;
}
