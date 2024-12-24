import { ClientNotExistError } from '@bongdungyeuem27-kit/core';
export const getIMTokenFromExtension = async () => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    const cosmos = window.cosmos;
    if (cosmos) {
        return cosmos;
    }
    if (document.readyState === 'complete') {
        if (cosmos) {
            return cosmos;
        }
        throw ClientNotExistError;
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (cosmos) {
                    resolve(cosmos);
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
