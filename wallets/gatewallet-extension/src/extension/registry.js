import { ICON } from '../constant';
export const GatewalletExtensionInfo = {
    name: 'gatewallet-extension',
    prettyName: 'GateWallet',
    logo: ICON,
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
