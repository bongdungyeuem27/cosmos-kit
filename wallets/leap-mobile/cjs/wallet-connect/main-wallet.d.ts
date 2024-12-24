import { EndpointOptions, Wallet } from '@bongdungyeuem27-kit/core';
import { WCWallet } from '@bongdungyeuem27-kit/walletconnect';
export declare class LeapMobileWallet extends WCWallet {
    constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions['endpoints']);
}
