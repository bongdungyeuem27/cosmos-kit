import { MainWalletBase } from '@bongdungyeuem27-kit/core';
export declare type WalletName =
  | 'keplr'
  | 'cosmostation'
  | 'ledger'
  | 'okxwallet'
  | 'station'
  | 'leap'
  | 'trust'
  | 'ctrl'
  | 'vectis'
  | 'frontier'
  | 'fin'
  | 'omni'
  | 'coin98'
  | 'shell'
  | 'compass'
  | 'tailwind'
  | 'owallet'
  | 'exodus'
  | 'galaxystation'
  | 'cdcwallet';
export declare type WalletList<
  E extends MainWalletBase | null,
  M extends MainWalletBase | null
> = (E extends MainWalletBase
  ? M extends MainWalletBase
    ? [E, M]
    : [E]
  : M extends MainWalletBase
  ? [M]
  : []) & {
  mobile: M | null;
  extension: E | null;
};
export declare function createWalletList<
  ExtensionWallet extends MainWalletBase | null,
  MobileWallet extends MainWalletBase | null,
  MetaMaskSnap extends MainWalletBase | null
>(
  extension: ExtensionWallet | null,
  mobile: MobileWallet | null,
  snap?: MetaMaskSnap
): WalletList<ExtensionWallet, MobileWallet>;
export declare const keplr: WalletList<
  import('@bongdungyeuem27-kit/keplr-extension').KeplrExtensionWallet,
  import('@bongdungyeuem27-kit/keplr-mobile').KeplrMobileWallet
>;
export declare const cosmostation: WalletList<
  import('@bongdungyeuem27-kit/cosmostation-extension').CosmostationExtensionWallet,
  import('@bongdungyeuem27-kit/cosmostation-mobile').CosmostationMobileWallet
>;
export declare const ledger: import('@bongdungyeuem27-kit/ledger/cjs/web-usb-hid').LedgerMainWallet[];
export declare const leap: WalletList<
  import('@bongdungyeuem27-kit/leap-extension').LeapExtensionWallet,
  import('@bongdungyeuem27-kit/leap-mobile').LeapMobileWallet
>;
export declare const station: WalletList<
  import('@bongdungyeuem27-kit/station-extension').StationExtensionWallet,
  any
>;
export declare const okxwallet: WalletList<
  import('@bongdungyeuem27-kit/okxwallet-extension').OkxwalletExtensionWallet,
  any
>;
export declare const trust: WalletList<
  import('@bongdungyeuem27-kit/trust-extension').TrustExtensionWallet,
  import('@bongdungyeuem27-kit/trust-mobile').TrustMobileWallet
>;
export declare const ctrl: WalletList<
  import('@bongdungyeuem27-kit/ctrl-extension').CTRLExtensionWallet,
  any
>;
export declare const vectis: WalletList<
  import('@bongdungyeuem27-kit/vectis-extension').VectisExtensionWallet,
  any
>;
export declare const frontier: WalletList<
  import('@bongdungyeuem27-kit/frontier-extension').FrontierExtensionWallet,
  any
>;
export declare const fin: WalletList<
  import('@bongdungyeuem27-kit/fin-extension').FinExtensionWallet,
  any
>;
export declare const omni: WalletList<
  any,
  import('@bongdungyeuem27-kit/omni-mobile').OmniMobileWallet
>;
export declare const shell: WalletList<
  import('@bongdungyeuem27-kit/shell-extension').ShellExtensionWallet,
  any
>;
export declare const coin98: WalletList<
  import('@bongdungyeuem27-kit/coin98-extension').Coin98ExtensionWallet,
  any
>;
export declare const compass: WalletList<
  import('@bongdungyeuem27-kit/compass-extension').CompassExtensionWallet,
  any
>;
export declare const exodus: WalletList<
  import('@bongdungyeuem27-kit/exodus-extension').ExodusExtensionWallet,
  any
>;
export declare const tailwind: WalletList<MainWalletBase, any>;
export declare const owallet: WalletList<
  import('@bongdungyeuem27-kit/owallet-extension').OwalletExtensionWallet,
  import('@bongdungyeuem27-kit/owallet-mobile').OWalletMobileWallet
>;
export declare const galaxystation: WalletList<
  import('@bongdungyeuem27-kit/galaxy-station-extension').GalaxyStationExtensionWallet,
  any
>;
export declare const cdcwallet: WalletList<
  import('@bongdungyeuem27-kit/cdcwallet-extension').CdcwalletExtensionWallet,
  any
>;
export declare type SubWalletList = MainWalletBase[] & {
  get mobile(): MainWalletBase[];
  get extension(): MainWalletBase[];
};
export declare type AllWalletList = SubWalletList & {
  keplr: typeof keplr;
  cosmostation: typeof cosmostation;
  ledger: typeof ledger;
  okxwallet: typeof okxwallet;
  station: typeof station;
  leap: typeof leap;
  trust: typeof trust;
  ctrl: typeof ctrl;
  vectis: typeof vectis;
  frontier: typeof frontier;
  fin: typeof fin;
  omni: typeof omni;
  coin98: typeof coin98;
  compass: typeof compass;
  exodus: typeof exodus;
  tailwind: typeof tailwind;
  owallet: typeof owallet;
  galaxystation: typeof galaxystation;
  cdcwallet: typeof cdcwallet;
  for: (...names: WalletName[]) => SubWalletList;
  not: (...names: WalletName[]) => SubWalletList;
};
export declare function defineGetters(wallets: MainWalletBase[]): SubWalletList;
export declare function createAllWalletList(
  ws: MainWalletBase[]
): AllWalletList;
export declare const wallets: AllWalletList;
