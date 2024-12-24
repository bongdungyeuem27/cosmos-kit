"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.owalletMobileInfo = void 0;
const constant_1 = require("../constant");
exports.owalletMobileInfo = {
    name: 'owallet-mobile',
    prettyName: 'OWallet Mobile',
    logo: constant_1.ICON,
    mode: 'wallet-connect',
    mobileDisabled: () => 'owallet' in window && /OWalletMobile/i.test(navigator.userAgent),
    rejectMessage: {
        source: 'Request rejected',
    },
    downloads: [
        {
            device: 'mobile',
            os: 'android',
            link: 'https://play.google.com/store/apps/details?id=com.io.owallet',
        },
        {
            device: 'mobile',
            os: 'ios',
            link: 'https://apps.apple.com/app/owallet/id1626035069',
        },
        {
            link: 'https://owallet.io/',
        },
    ],
    connectEventNamesOnWindow: ['keplr_keystorechange'],
    walletconnect: {
        name: 'OWallet',
        projectId: '5a2b2db3d2ed90458a41d2a0c5e4bd28ec67b6fa272b0e201cc8508dc3d4be87',
        encoding: 'base64',
        mobile: {
            native: {
                ios: 'owallet:',
                android: 'intent:',
            },
        },
        formatNativeUrl: (appUrl, wcUri, os, _name) => {
            const plainAppUrl = appUrl.split(':')[0];
            const encodedWcUrl = encodeURIComponent(wcUri);
            switch (os) {
                case 'ios':
                    return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
                case 'android':
                    return `intent://wcV2?${encodedWcUrl}#Intent;package=com.io.owallet;scheme=owallet;end;`;
                default:
                    return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
            }
        },
    },
};
