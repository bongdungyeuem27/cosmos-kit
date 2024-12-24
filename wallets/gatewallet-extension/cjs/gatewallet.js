"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const gatewalletExtension = new extension_1.GatewalletExtensionWallet(extension_1.GatewalletExtensionInfo);
exports.wallets = [gatewalletExtension];
