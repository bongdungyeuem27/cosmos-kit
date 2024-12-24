"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = exports.createAllWalletList = exports.defineGetters = exports.keplr = exports.createWalletList = void 0;
const keplr_extension_1 = require("@bongdungyeuem27-kit/keplr-extension");
const keplr_mobile_1 = require("@bongdungyeuem27-kit/keplr-mobile");
function createWalletList(extension, mobile, snap) {
    const list = [extension, mobile, snap].filter((wallet) => Boolean(wallet));
    list.mobile = mobile;
    list.extension = extension;
    return list;
}
exports.createWalletList = createWalletList;
exports.keplr = createWalletList(keplr_extension_1.wallets[0], keplr_mobile_1.wallets[0]);
function defineGetters(wallets) {
    return Object.defineProperties(wallets, {
        mobile: {
            get() {
                return this.filter((wallet) => wallet.isModeWalletConnect);
            },
        },
        extension: {
            get() {
                return this.filter((wallet) => wallet.isModeExtension);
            },
        },
    });
}
exports.defineGetters = defineGetters;
function createAllWalletList(ws) {
    const wallets = ws.slice();
    wallets.keplr = exports.keplr;
    defineGetters(wallets);
    wallets.for = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(names
            .map((name) => wallets.filter((wallet) => wallet.walletInfo.name.startsWith(name)))
            .flat());
    };
    wallets.not = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(wallets.filter((wallet) => !names.some((name) => wallet.walletInfo.name.startsWith(name))));
    };
    return wallets;
}
exports.createAllWalletList = createAllWalletList;
exports.wallets = createAllWalletList([...exports.keplr]);
