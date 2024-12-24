"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrlExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.ctrlExtensionInfo = {
    name: 'ctrl-extension',
    prettyName: 'CTRL',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/ctrl-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
        },
        {
            link: 'https://chromewebstore.google.com/detail/ctrl-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
        },
    ],
};
