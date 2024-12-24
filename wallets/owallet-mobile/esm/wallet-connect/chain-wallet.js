import { ChainWC } from '@bongdungyeuem27-kit/walletconnect';

import { OWalletClient } from './client';
export class ChainOWalletMobile extends ChainWC {
  constructor(walletInfo, chainInfo) {
    super(walletInfo, chainInfo, OWalletClient);
  }
}
