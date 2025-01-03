import {
  ChainWalletBase,
  State,
  type ChainRecord,
  type Mutable,
  type Wallet,
  type WalletConnectOptions,
} from '@cosmos-kit/core';

import { WCClient } from './client';
import { IWCClient } from './types';

export class ChainWC extends ChainWalletBase {
  WCClient: IWCClient;
  clientMutable: Mutable<WCClient> = { state: State.Init };
  options?: WalletConnectOptions;

  constructor(walletInfo: Wallet, chainInfo: ChainRecord, WCClient: IWCClient) {
    super(walletInfo, chainInfo);
    this.WCClient = WCClient;
  }

  setClientNotExist() {
    this.setState(State.Error);
    this.setMessage(this.clientMutable.message);
  }
}
