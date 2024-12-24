import { EndpointOptions, Wallet } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
export declare class FinExtensionWallet extends MainWalletBase {
    constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions['endpoints']);
    initClient(): Promise<void>;
}
