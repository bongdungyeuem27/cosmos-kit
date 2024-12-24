 
import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { DirectSignDoc, SignOptions, SignType, WalletClient } from '@cosmos-kit/core';
import { CapsuleProvider } from '@leapwallet/cosmos-social-login-capsule-provider';
export declare class CosmosCapsuleClient implements WalletClient {
    readonly loginProvider: CapsuleProvider;
    constructor(options: {
        loginProvider: CapsuleProvider;
    });
    disconnect(): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    enable(): Promise<void>;
    handleConnect(): Promise<void>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        algo: import("@cosmjs/proto-signing").Algo;
        pubkey: Uint8Array;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): import("@cosmjs/proto-signing").OfflineDirectSigner | import("@usecapsule/cosmjs-v0-integration").CapsuleAminoSigner;
    getOfflineSignerAmino(chainId: string): any;
    getOfflineSignerDirect(chainId: string): any;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<any>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc): Promise<any>;
}
