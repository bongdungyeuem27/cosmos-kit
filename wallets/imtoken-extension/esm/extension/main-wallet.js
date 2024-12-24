import { MainWalletBase } from '@bongdungyeuem27-kit/core';
import { ChainIMTokenExtension } from './chain-wallet';
import { IMTokenClient } from './client';
import { getIMTokenFromExtension } from './utils';
export class IMTokenWallet extends MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, ChainIMTokenExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const imToken = await getIMTokenFromExtension();
            this.initClientDone(imToken ? new IMTokenClient(imToken) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
