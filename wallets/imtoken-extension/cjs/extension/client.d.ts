import { StdSignature, StdSignDoc } from '@cosmjs/amino';
import { Algo, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { BroadcastMode, ChainRecord, SignType, SuggestToken } from '@bongdungyeuem27-kit/core';
import { DirectSignDoc, SignOptions, WalletClient } from '@bongdungyeuem27-kit/core';
import { IMToken } from './types';
export declare class IMTokenClient implements WalletClient {
    readonly client: IMToken;
    private _defaultSignOptions;
    get defaultSignOptions(): SignOptions;
    setDefaultSignOptions(options: SignOptions): void;
    constructor(client: IMToken);
    enable(chainIds: string | string[]): Promise<void>;
    suggestToken({ chainId, tokens, type }: SuggestToken): Promise<void>;
    addChain(chainInfo: ChainRecord): Promise<void>;
    disconnect(): Promise<void>;
    getSimpleAccount(chainId: string): Promise<{
        namespace: string;
        chainId: string;
        address: string;
        username: string;
    }>;
    getAccount(chainId: string): Promise<{
        username: string;
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
        isNanoLedger: boolean;
    }>;
    getOfflineSigner(chainId: string, preferredSignType?: SignType): import("@cosmjs/amino").OfflineAminoSigner | OfflineDirectSigner;
    getOfflineSignerAmino(chainId: string): import("@cosmjs/amino").OfflineAminoSigner;
    getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<import("@cosmjs/amino").AminoSignResponse>;
    signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<import("@cosmjs/proto-signing").DirectSignResponse>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
