import { ChainWC } from '@bongdungyeuem27-kit/walletconnect';
import { TrustClient } from './client';
export class ChainTrustMobile extends ChainWC {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo, TrustClient);
    }
}
