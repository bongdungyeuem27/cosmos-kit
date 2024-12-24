import { ChainWalletBase, State, } from '@bongdungyeuem27-kit/core';
export class ChainWC extends ChainWalletBase {
    WCClient;
    clientMutable = { state: State.Init };
    options;
    constructor(walletInfo, chainInfo, WCClient) {
        super(walletInfo, chainInfo);
        this.WCClient = WCClient;
    }
    setClientNotExist() {
        this.setState(State.Error);
        this.setMessage(this.clientMutable.message);
    }
}
