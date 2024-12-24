import { EndpointOptions, Wallet } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
import { TransportType } from './utils';
export declare class LedgerMainWallet extends MainWalletBase {
    transportType: TransportType;
    constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions['endpoints'], transportType?: TransportType);
    initClient(): Promise<void>;
}
