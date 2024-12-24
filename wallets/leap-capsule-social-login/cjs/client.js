"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */ // --> OFF
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosCapsuleClient = void 0;
const amino_1 = require("@cosmjs/amino");
class CosmosCapsuleClient {
    loginProvider;
    constructor(options) {
        this.loginProvider = options.loginProvider;
    }
    async disconnect() {
        await this.loginProvider.disconnect();
    }
    async getSimpleAccount(chainId) {
        const { address, username } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
            username,
        };
    }
    async enable() {
        await this.handleConnect();
    }
    async handleConnect() {
        await this.loginProvider.handleConnect();
    }
    async getAccount(chainId) {
        return this.loginProvider.getAccount(chainId);
    }
    getOfflineSigner(chainId, preferredSignType) {
        return this.loginProvider.getOfflineSigner(chainId, preferredSignType);
    }
    getOfflineSignerAmino(chainId) {
        return this.loginProvider.getOfflineSignerAmino(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return this.loginProvider.getOfflineSignerDirect(chainId);
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        return this.loginProvider.signAmino(chainId, signer, signDoc, signOptions);
    }
    async signArbitrary(chainId, signer, data) {
        const account = await this.getAccount(chainId);
        if (!account) {
            throw new Error(`Wallet not connected to chain ${chainId}`);
        }
        const pubkey = (() => {
            switch (account.algo) {
                case 'secp256k1':
                    return (0, amino_1.encodeSecp256k1Pubkey)(account.pubkey);
                case 'ed25519':
                    return (0, amino_1.encodeEd25519Pubkey)(account.pubkey);
                default:
                    throw new Error('sr25519 public key algorithm is not supported');
            }
        })();
        const signature = await this.loginProvider.signArbitrary(chainId, signer, data);
        return {
            signature,
            pub_key: {
                type: account.algo === 'secp256k1'
                    ? amino_1.pubkeyType.secp256k1
                    : amino_1.pubkeyType.ed25519,
                value: pubkey.value,
            },
        };
    }
    async signDirect(chainId, signer, signDoc) {
        return this.loginProvider.signDirect(chainId, signer, signDoc);
    }
}
exports.CosmosCapsuleClient = CosmosCapsuleClient;
