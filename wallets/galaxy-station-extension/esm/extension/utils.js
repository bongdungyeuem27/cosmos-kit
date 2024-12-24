import { ClientNotExistError } from '@bongdungyeuem27-kit/core';
export const getGalaxyStationFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const station = window.galaxyStation;
    if (station) {
        return station;
    }
    if (document.readyState === 'complete') {
        if (station) {
            return station;
        }
        else {
            throw ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                const station = window.galaxyStation;
                if (station) {
                    resolve(station);
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
