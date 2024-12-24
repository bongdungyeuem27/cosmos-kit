import { ClientNotExistError } from '@cosmos-kit/core';
export const getCTRLFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const ctrl = window?.xfi?.keplr;
    if (ctrl) {
        return ctrl;
    }
    if (document.readyState === 'complete') {
        if (ctrl) {
            return ctrl;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const ctrl = window?.xfi?.keplr;
                if (ctrl) {
                    resolve(ctrl);
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
