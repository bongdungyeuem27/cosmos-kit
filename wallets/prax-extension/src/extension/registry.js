import { ICON } from '../constant.js';
export const praxExtensionInfo = {
    name: 'prax-extension',
    prettyName: 'Prax',
    logo: ICON,
    mode: 'extension',
    mobileDisabled: true,
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chromewebstore.google.com/detail/prax-wallet/lkpmkhpnhknhmibgnmmhdhgdilepfghe',
        },
        {
            link: 'https://chromewebstore.google.com/detail/prax-wallet/lkpmkhpnhknhmibgnmmhdhgdilepfghe',
        },
    ],
};
