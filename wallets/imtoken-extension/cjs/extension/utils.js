"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIMTokenFromExtension = void 0;
const core_1 = require("@bongdungyeuem27-kit/core");
const getIMTokenFromExtension = async () => {
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
        throw core_1.ClientNotExistError;
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (cosmos) {
                    resolve(cosmos);
                }
                else {
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getIMTokenFromExtension = getIMTokenFromExtension;
