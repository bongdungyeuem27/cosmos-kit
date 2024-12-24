"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imTokenWalletInfo = void 0;
const constant_1 = require("../constant");
exports.imTokenWalletInfo = {
    name: 'imToken',
    prettyName: 'imToken',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => !('imToken' in window && 'cosmos' in window),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['imtoken_keystorechange'],
    downloads: [
        {
            link: 'https://token.im/download',
        },
    ],
};
