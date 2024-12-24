import { CosmJSOfflineSigner, CosmosSnap, installSnap, signDirect, suggestChain, } from '@cosmsnap/snapper';
import Long from 'long';
export class CosmosExtensionClient {
    cosmos;
    _defaultSignOptions = {
        preferNoSetFee: false,
        preferNoSetMemo: true,
        disableBalanceCheck: true,
    };
    get defaultSignOptions() {
        return this._defaultSignOptions;
    }
    setDefaultSignOptions(options) {
        this._defaultSignOptions = options;
    }
    constructor() {
        this.cosmos = new CosmosSnap();
    }
    async addChain(chainInfo) {
        await suggestChain(chainInfo.chain);
    }
    async getSimpleAccount(chainId) {
        const { address } = await this.getAccount(chainId);
        return {
            namespace: 'cosmos',
            chainId,
            address,
        };
    }
    async getAccount(chainId) {
        await installSnap();
        const key = await this.cosmos.getAccount(chainId);
        return {
            address: key.address,
            algo: key.algo,
            pubkey: key.pubkey,
        };
    }
    getOfflineSigner(chainId, preferredSignType) {
        switch (preferredSignType) {
            case 'amino':
                return this.getOfflineSignerAmino(chainId);
            case 'direct':
                return this.getOfflineSignerDirect(chainId);
            default:
                return this.getOfflineSignerAmino(chainId);
        }
    }
    getOfflineSignerAmino(chainId) {
        return new CosmJSOfflineSigner(chainId);
    }
    getOfflineSignerDirect(chainId) {
        return {
            getAccounts: async () => {
                return [await this.getAccount(chainId)];
            },
            signDirect: async (signerAddress, signDoc) => {
                const { accountNumber } = signDoc;
                const signDocNew = {
                    bodyBytes: signDoc.bodyBytes,
                    authInfoBytes: signDoc.authInfoBytes,
                    chainId: signDoc.chainId,
                    accountNumber: Long.fromString(signDoc.accountNumber.toString())
                };
                const signRes = await signDirect(chainId, signerAddress, signDocNew);
                const sign = {
                    signature: signRes.signature,
                    signed: {
                        ...signRes.signed,
                        accountNumber,
                        authInfoBytes: new Uint8Array(Object.values(signRes.signed.authInfoBytes)),
                        bodyBytes: new Uint8Array(Object.values(signRes.signed.bodyBytes)),
                    },
                };
                return sign;
            }
        };
    }
    async signAmino(chainId, signer, signDoc, signOptions) {
        return await this.cosmos.signAmino(chainId, signer, signDoc);
    }
    async signArbitrary(chainId, signer, data) {
        const signature = await this.cosmos.signArbitrary(chainId, signer, data);
        return signature;
    }
    async signDirect(chainId, signer, signDoc, signOptions) {
        const { accountNumber } = signDoc;
        const signDocNew = {
            bodyBytes: signDoc.bodyBytes,
            authInfoBytes: signDoc.authInfoBytes,
            chainId: signDoc.chainId,
            accountNumber: Long.fromString(accountNumber.toString())
        };
        const signRes = await signDirect(chainId, signer, signDocNew);
        const sign = {
            signature: signRes.signature,
            signed: {
                ...signRes.signed,
                accountNumber,
                authInfoBytes: new Uint8Array(Object.values(signRes.signed.authInfoBytes)),
                bodyBytes: new Uint8Array(Object.values(signRes.signed.bodyBytes)),
            },
        };
        return sign;
    }
}
