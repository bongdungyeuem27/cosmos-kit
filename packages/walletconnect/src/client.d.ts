/// <reference types="node" />
/// <reference types="node" />
import type {
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from '@cosmjs/amino';
import type {
  DirectSignResponse,
  OfflineDirectSigner,
} from '@cosmjs/proto-signing';
import type {
  AppUrl,
  DappEnv,
  DirectSignDoc,
  DisconnectOptions,
  Logger,
  Mutable,
  SignOptions,
  SignType,
  SimpleAccount,
  Wallet,
  WalletAccount,
  WalletClient,
  WalletClientActions,
  WalletConnectOptions,
} from '@cosmos-kit/core';
import { State } from '@cosmos-kit/core';
import SignClient from '@cosmoskitconnect/sign-client';
import {
  EngineTypes,
  PairingTypes,
  SessionTypes,
} from '@cosmoskitconnect/types';
import type EventEmitter from 'events';
export declare class WCClient implements WalletClient {
  readonly walletInfo: Wallet;
  signClient?: SignClient;
  wcCloudInfo?: any;
  actions?: WalletClientActions;
  qrUrl: Mutable<string>;
  appUrl: Mutable<AppUrl>;
  pairings: PairingTypes.Struct[];
  sessions: SessionTypes.Struct[];
  emitter?: EventEmitter;
  logger?: Logger;
  options?: WalletConnectOptions;
  relayUrl?: string;
  env?: DappEnv;
  requiredNamespaces?: {
    methods: string[];
    events: string[];
  };
  private _defaultSignOptions;
  constructor(walletInfo: Wallet);
  get defaultSignOptions(): SignOptions;
  setDefaultSignOptions(options: SignOptions): void;
  get isMobile(): boolean;
  get wcName(): string;
  get wcEncoding(): BufferEncoding;
  get wcProjectId(): string;
  get wcMobile(): AppUrl;
  get accounts(): SimpleAccount[];
  deleteSession(topic: string): void;
  subscribeToEvents(): void;
  deleteInactivePairings(): Promise<void>;
  deleteAllPairings(): Promise<void>;
  restorePairings(): void;
  get pairing(): PairingTypes.Struct | undefined;
  restoreSessions(): void;
  getSession(namespace: string, chainId: string): Promise<SessionTypes.Struct>;
  get walletName(): string;
  get dappProjectId(): any;
  setActions(actions: WalletClientActions): void;
  setQRState(state: State): void;
  setQRError(e?: Error | string): void;
  init(): Promise<void>;
  initSignClient(): Promise<void>;
  initWCCloudInfo(): Promise<void>;
  initAppUrl(): Promise<void>;
  get nativeUrl(): string;
  get universalUrl(): string;
  get redirectHref(): string | undefined;
  get redirectHrefWithWCUri(): string | undefined;
  get displayQRCode(): boolean;
  get redirect(): boolean;
  openApp(withWCUri?: boolean): void;
  connect(
    chainIds: string | string[],
    options?: EngineTypes.ConnectParams
  ): Promise<void>;
  disconnect(options?: DisconnectOptions): Promise<void>;
  getSimpleAccount(chainId: string): Promise<SimpleAccount>;
  getOfflineSignerAmino(chainId: string): OfflineAminoSigner;
  getOfflineSignerDirect(chainId: string): OfflineDirectSigner;
  getOfflineSigner(
    chainId: string,
    preferredSignType?: SignType
  ): Promise<OfflineAminoSigner | OfflineDirectSigner>;
  protected _getAccount(chainId: string): Promise<any>;
  getAccount(chainId: string): Promise<WalletAccount>;
  protected _signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: SignOptions
  ): Promise<any>;
  signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: SignOptions
  ): Promise<AminoSignResponse>;
  protected _signDirect(
    chainId: string,
    signer: string,
    signDoc: DirectSignDoc,
    signOptions?: SignOptions
  ): Promise<any>;
  signDirect(
    chainId: string,
    signer: string,
    signDoc: DirectSignDoc,
    signOptions?: SignOptions
  ): Promise<DirectSignResponse>;
}
