import { ICON } from '../constant';
export const oktoExtensionInfo = {
    name: 'okto-extension',
    prettyName: 'Okto',
    logo: ICON,
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
