"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGatewalletFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getGatewalletFromExtension = async () => {
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
            throw core_1.ClientNotExistError;
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
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getGatewalletFromExtension = getGatewalletFromExtension;
