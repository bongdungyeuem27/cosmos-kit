"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OWalletClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class OWalletClient extends walletconnect_1.WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
exports.OWalletClient = OWalletClient;
