"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainShellExtension = void 0;
const core_1 = require("@bongdungyeuem27-kit/core");
class ChainShellExtension extends core_1.ChainWalletBase {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo);
    }
}
exports.ChainShellExtension = ChainShellExtension;
