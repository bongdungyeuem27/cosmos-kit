import { ChainWC } from '@bongdungyeuem27-kit/walletconnect';
import { KeplrClient } from './client';
export class ChainKeplrMobile extends ChainWC {
    constructor(walletInfo, chainInfo) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super(walletInfo, chainInfo, KeplrClient);
    }
}
