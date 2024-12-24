"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAriaFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getAriaFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const aria = window.aria;
    if (aria) {
        return aria;
    }
    if (document.readyState === 'complete') {
        if (aria) {
            return aria;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (aria) {
                    resolve(aria);
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
exports.getAriaFromExtension = getAriaFromExtension;
