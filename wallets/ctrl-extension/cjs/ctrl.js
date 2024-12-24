"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const ctrlExtension = new extension_1.CTRLExtensionWallet(extension_1.ctrlExtensionInfo);
exports.wallets = [ctrlExtension];
