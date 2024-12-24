import { EndpointOptions, Wallet, WalletConnectOptions } from '@bongdungyeuem27-kit/core';
import { WCWallet } from '@bongdungyeuem27-kit/walletconnect';
export declare class KeplrMobileWallet extends WCWallet {
    constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions['endpoints']);
    initClient(options?: WalletConnectOptions): Promise<void>;
}
