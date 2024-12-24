'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.wallets = void 0;
const owallet_extension_1 = require('@bongdungyeuem27-kit/owallet-extension');
const owallet_mobile_1 = require('@bongdungyeuem27-kit/owallet-mobile');
exports.wallets = [...owallet_extension_1.wallets, ...owallet_mobile_1.wallets];
