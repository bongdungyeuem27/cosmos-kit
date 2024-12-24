"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewalletExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.GatewalletExtensionInfo = {
    name: 'gatewallet-extension',
    prettyName: 'GateWallet',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['gatewallet_keystorechange'],
    downloads: [
        {
            link: 'https://www.gate.io/zh/mobileapp',
        },
    ],
};
