import { ICON } from '../constant';
export const imTokenWalletInfo = {
    name: 'imToken',
    prettyName: 'imToken',
    logo: ICON,
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
