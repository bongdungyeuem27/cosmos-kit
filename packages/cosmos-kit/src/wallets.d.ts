import { MainWalletBase } from '@cosmos-kit/core';
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
  import('@cosmos-kit/keplr-extension').KeplrExtensionWallet,
  import('@cosmos-kit/keplr-mobile').KeplrMobileWallet
>;
export declare const cosmostation: WalletList<
  import('@cosmos-kit/cosmostation-extension').CosmostationExtensionWallet,
  import('@cosmos-kit/cosmostation-mobile').CosmostationMobileWallet
>;
export declare const ledger: import('@cosmos-kit/ledger/cjs/web-usb-hid').LedgerMainWallet[];
export declare const leap: WalletList<
  import('@cosmos-kit/leap-extension').LeapExtensionWallet,
  import('@cosmos-kit/leap-mobile').LeapMobileWallet
>;
export declare const station: WalletList<
  import('@cosmos-kit/station-extension').StationExtensionWallet,
  any
>;
export declare const okxwallet: WalletList<
  import('@cosmos-kit/okxwallet-extension').OkxwalletExtensionWallet,
  any
>;
export declare const trust: WalletList<
  import('@cosmos-kit/trust-extension').TrustExtensionWallet,
  import('@cosmos-kit/trust-mobile').TrustMobileWallet
>;
export declare const ctrl: WalletList<
  import('@cosmos-kit/ctrl-extension').CTRLExtensionWallet,
  any
>;
export declare const vectis: WalletList<
  import('@cosmos-kit/vectis-extension').VectisExtensionWallet,
  any
>;
export declare const frontier: WalletList<
  import('@cosmos-kit/frontier-extension').FrontierExtensionWallet,
  any
>;
export declare const fin: WalletList<
  import('@cosmos-kit/fin-extension').FinExtensionWallet,
  any
>;
export declare const omni: WalletList<
  any,
  import('@cosmos-kit/omni-mobile').OmniMobileWallet
>;
export declare const shell: WalletList<
  import('@cosmos-kit/shell-extension').ShellExtensionWallet,
  any
>;
export declare const coin98: WalletList<
  import('@cosmos-kit/coin98-extension').Coin98ExtensionWallet,
  any
>;
export declare const compass: WalletList<
  import('@cosmos-kit/compass-extension').CompassExtensionWallet,
  any
>;
export declare const exodus: WalletList<
  import('@cosmos-kit/exodus-extension').ExodusExtensionWallet,
  any
>;
export declare const tailwind: WalletList<MainWalletBase, any>;
export declare const owallet: WalletList<
  import('@cosmos-kit/owallet-extension').OwalletExtensionWallet,
  import('@cosmos-kit/owallet-mobile').OWalletMobileWallet
>;
export declare const galaxystation: WalletList<
  import('@cosmos-kit/galaxy-station-extension').GalaxyStationExtensionWallet,
  any
>;
export declare const cdcwallet: WalletList<
  import('@cosmos-kit/cdcwallet-extension').CdcwalletExtensionWallet,
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
