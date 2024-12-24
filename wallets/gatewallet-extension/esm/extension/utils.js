import { ClientNotExistError } from '@bongdungyeuem27-kit/core';
export const getGatewalletFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const gatewallet = window.gatewallet?.keplr;
    if (gatewallet) {
        return gatewallet;
    }
    if (document.readyState === 'complete') {
        if (gatewallet) {
            return gatewallet;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (gatewallet) {
                    resolve(gatewallet);
                }
                else {
                    reject(ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
