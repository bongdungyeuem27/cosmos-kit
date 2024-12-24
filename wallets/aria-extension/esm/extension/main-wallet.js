import { MainWalletBase } from '@bongdungyeuem27-kit/core';

import { ChainAriaExtension } from './chain-wallet';
import { AriaClient } from './client';
import { getAriaFromExtension } from './utils';
export class AriaExtensionWallet extends MainWalletBase {
  constructor(walletInfo) {
    super(walletInfo, ChainAriaExtension);
  }
  async initClient() {
    this.initingClient();
    try {
      const aria = await getAriaFromExtension();
      this.initClientDone(aria ? new AriaClient(aria) : undefined);
    } catch (error) {
      this.initClientError(error);
    }
  }
}
