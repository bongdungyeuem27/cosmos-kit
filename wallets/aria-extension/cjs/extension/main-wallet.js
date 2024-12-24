"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class AriaExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainAriaExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const aria = await (0, utils_1.getAriaFromExtension)();
            this.initClientDone(aria ? new client_1.AriaClient(aria) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.AriaExtensionWallet = AriaExtensionWallet;
