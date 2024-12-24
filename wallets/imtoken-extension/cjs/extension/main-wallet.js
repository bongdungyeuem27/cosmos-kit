"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMTokenWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class IMTokenWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainIMTokenExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const imToken = await (0, utils_1.getIMTokenFromExtension)();
            this.initClientDone(imToken ? new client_1.IMTokenClient(imToken) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.IMTokenWallet = IMTokenWallet;
