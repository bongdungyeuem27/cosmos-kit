"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oktoExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.oktoExtensionInfo = {
    name: 'okto-extension',
    prettyName: 'Okto',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: false,
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['okto_keystorechange'],
    downloads: [
        {
            link: 'https://www.okto.tech',
        },
    ],
};
