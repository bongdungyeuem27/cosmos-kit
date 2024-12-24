import { AminoSignResponse, StdSignDoc } from '@cosmjs/amino';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import { DirectSignDoc, SignOptions, Wallet } from '@bongdungyeuem27-kit/core';
import { WCClient } from '@bongdungyeuem27-kit/walletconnect';
export declare class OmniClient extends WCClient {
    constructor(walletInfo: Wallet);
    signAmino(chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions): Promise<AminoSignResponse>;
    signDirect(chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions): Promise<DirectSignResponse>;
}
