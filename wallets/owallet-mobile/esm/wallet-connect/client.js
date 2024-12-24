import { WCClient } from '@cosmos-kit/walletconnect';
export class OWalletClient extends WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
