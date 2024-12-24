import { ChainWC } from '@bongdungyeuem27-kit/walletconnect';
import { CosmostationClient } from './client';
export class ChainCosmostationMobile extends ChainWC {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo, CosmostationClient);
    }
}
