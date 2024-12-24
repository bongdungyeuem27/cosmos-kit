"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewalletExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class GatewalletExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo) {
        super(walletInfo, chain_wallet_1.ChainGatewalletExtension);
    }
    async initClient() {
        this.initingClient();
        try {
            const gatewallet = await (0, utils_1.getGatewalletFromExtension)();
            this.initClientDone(gatewallet ? new client_1.GatewalletClient(gatewallet) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.GatewalletExtensionWallet = GatewalletExtensionWallet;
