import type { Mutable, Wallet, WalletConnectOptions } from '@bongdungyeuem27-kit/core';
import { MainWalletBase } from '@bongdungyeuem27-kit/core';
import type { WCClient } from './client';
import { IChainWC, IWCClient } from './types';
export declare class WCWallet extends MainWalletBase {
    WCClient: IWCClient;
    clientMutable: Mutable<WCClient>;
    constructor(walletInfo: Wallet, ChainWC: IChainWC, WCClient: IWCClient);
    initClient(options?: WalletConnectOptions): Promise<void>;
}
