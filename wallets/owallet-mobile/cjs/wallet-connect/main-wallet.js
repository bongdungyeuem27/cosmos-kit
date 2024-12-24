'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OWalletMobileWallet = void 0;
const walletconnect_1 = require('@bongdungyeuem27-kit/walletconnect');
const chain_wallet_1 = require('./chain-wallet');
const client_1 = require('./client');
class OWalletMobileWallet extends walletconnect_1.WCWallet {
  constructor(walletInfo, preferredEndpoints) {
    super(
      walletInfo,
      chain_wallet_1.ChainOWalletMobile,
      client_1.OWalletClient
    );
    this.preferredEndpoints = preferredEndpoints;
  }
}
exports.OWalletMobileWallet = OWalletMobileWallet;
