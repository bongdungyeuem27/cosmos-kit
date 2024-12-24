import { ChainRecord, ChainWalletBase, Wallet } from '@bongdungyeuem27-kit/core';

export class ChainKeplrExtension extends ChainWalletBase {
  constructor(walletInfo: Wallet, chainInfo: ChainRecord) {
    super(walletInfo, chainInfo);
  }
}
