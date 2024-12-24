"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGatewalletExtension = void 0;
const core_1 = require("@cosmos-kit/core");
class ChainGatewalletExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainGatewalletExtension = ChainGatewalletExtension;
