import { MainWalletBase } from '@bongdungyeuem27-kit/core';
import { ChainCdcwalletExtension } from './chain-wallet';
import { CdcwalletClient } from './client';
import { getCdcwalletFromExtension } from './utils';
export class CdcwalletExtensionWallet extends MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, ChainCdcwalletExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const cdcwallet = await getCdcwalletFromExtension();
            this.initClientDone(cdcwallet ? new CdcwalletClient(cdcwallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
