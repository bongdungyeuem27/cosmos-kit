"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTRLExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class CTRLExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainCTRLExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const ctrl = await (0, utils_1.getCTRLFromExtension)();
            this.initClientDone(ctrl ? new client_1.CTRLClient(ctrl) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.CTRLExtensionWallet = CTRLExtensionWallet;
