"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCTRLFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getCTRLFromExtension = async () => {
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
            throw core_1.ClientNotExistError;
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
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getCTRLFromExtension = getCTRLFromExtension;
