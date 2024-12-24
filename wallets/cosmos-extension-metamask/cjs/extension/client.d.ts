import { OfflineAminoSigner, StdSignature, StdSignDoc, AminoSignResponse } from '@cosmjs/amino';
import { Algo, DirectSignResponse } from '@cosmjs/proto-signing';
import { ChainRecord, DirectSignDoc, SignType } from '@cosmos-kit/core';
import { SignOptions, WalletClient } from '@cosmos-kit/core';
import { CosmosSnap } from '@cosmsnap/snapper';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
export declare class CosmosExtensionClient implements WalletClient {
    cosmos: CosmosSnap;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor();
    addChain(chainInfo: ChainRecord): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
    }>;
    getAccount(chainId: string): Promise<{
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): OfflineAminoSigner | {
        getAccounts: () => Promise<{
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<{
            address: string;
            algo: Algo;
            pubkey: Uint8Array;
        }[]>;
        signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    };
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
}
