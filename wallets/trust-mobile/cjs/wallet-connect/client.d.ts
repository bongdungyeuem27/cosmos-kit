import { DirectSignDoc, SignOptions, Wallet } from '@bongdungyeuem27-kit/core';
import { WCClient } from '@bongdungyeuem27-kit/walletconnect';
import { AminoSignResponse, StdSignDoc } from '@cosmjs/amino';
import { DirectSignResponse } from '@cosmjs/proto-signing';
export declare class TrustClient extends WCClient {
    constructor(walletInfo: Wallet);
    getOfflineSignerAmino: any;
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
}
