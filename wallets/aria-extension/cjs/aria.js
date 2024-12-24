"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = void 0;
const extension_1 = require("./extension");
const ariaExtension = new extension_1.AriaExtensionWallet(extension_1.ariaExtensionInfo);
exports.wallets = [ariaExtension];
