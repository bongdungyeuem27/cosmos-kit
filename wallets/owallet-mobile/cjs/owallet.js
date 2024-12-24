"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const wallet_connect_1 = require("./wallet-connect");
const owalletMobile = new wallet_connect_1.OWalletMobileWallet(wallet_connect_1.owalletMobileInfo);
exports.wallets = [owalletMobile];
