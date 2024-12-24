import { WCWallet } from '@cosmos-kit/walletconnect';
import { ChainOWalletMobile } from './chain-wallet';
import { OWalletClient } from './client';
export class OWalletMobileWallet extends WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainOWalletMobile, OWalletClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
