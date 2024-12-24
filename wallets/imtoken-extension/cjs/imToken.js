"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const imTokenWallet = new extension_1.IMTokenWallet(extension_1.imTokenWalletInfo);
exports.wallets = [imTokenWallet];
