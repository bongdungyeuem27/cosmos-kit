import { ChainRecord, Wallet } from '@bongdungyeuem27-kit/core';
import { ChainWC } from '@bongdungyeuem27-kit/walletconnect';

import { KeplrClient } from './client';

export class ChainKeplrMobile extends ChainWC {
  constructor(walletInfo: Wallet, chainInfo: ChainRecord) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(walletInfo, chainInfo, KeplrClient);
  }
}
