"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ariaExtensionInfo = void 0;
const constant_1 = require("../constant");
exports.ariaExtensionInfo = {
    name: 'aria-extension',
    prettyName: 'Aria',
    logo: constant_1.ICON,
    mode: 'extension',
    mobileDisabled: () => !('aria' in window || /AriaCosmos/i.test(navigator.userAgent)),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['aria_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/aria-wallet/cgghllcclkhfpkjhgomhehlebgphifbm',
        },
    ],
};
