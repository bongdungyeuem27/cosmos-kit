import { MainWalletBase } from '@bongdungyeuem27-kit/core';

import { wallets as keplrExtension } from '@bongdungyeuem27-kit/keplr-extension';
import { wallets as keplrMobile } from '@bongdungyeuem27-kit/keplr-mobile';

export type WalletName = 'keplr';

export type WalletList<
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

export function createWalletList<
  ExtensionWallet extends MainWalletBase | null,
  MobileWallet extends MainWalletBase | null,
  MetaMaskSnap extends MainWalletBase | null
>(
  extension: ExtensionWallet | null,
  mobile: MobileWallet | null,
  snap?: MetaMaskSnap
) {
  const list = [extension, mobile, snap].filter((wallet) =>
    Boolean(wallet)
  ) as WalletList<ExtensionWallet, MobileWallet>;
  list.mobile = mobile;
  list.extension = extension;
  return list;
}

export const keplr = createWalletList(keplrExtension[0], keplrMobile[0]);

export type SubWalletList = MainWalletBase[] & {
  get mobile(): MainWalletBase[];
  get extension(): MainWalletBase[];
};

export type AllWalletList = SubWalletList & {
  keplr: typeof keplr;

  for: (...names: WalletName[]) => SubWalletList;
  not: (...names: WalletName[]) => SubWalletList;
};

export function defineGetters(wallets: MainWalletBase[]) {
  return Object.defineProperties(wallets, {
    mobile: {
      get() {
        return this.filter(
          (wallet: MainWalletBase) => wallet.isModeWalletConnect
        );
      },
    },
    extension: {
      get() {
        return this.filter((wallet: MainWalletBase) => wallet.isModeExtension);
      },
    },
  }) as SubWalletList;
}

export function createAllWalletList(ws: MainWalletBase[]) {
  const wallets = ws.slice() as AllWalletList;

  wallets.keplr = keplr;

  defineGetters(wallets);

  wallets.for = function (...ns: WalletName[]) {
    const names = Array.from(new Set(ns));
    return defineGetters(
      names
        .map((name: WalletName) =>
          wallets.filter((wallet: MainWalletBase) =>
            wallet.walletInfo.name.startsWith(name)
          )
        )
        .flat()
    );
  };

  wallets.not = function (...ns: WalletName[]) {
    const names = Array.from(new Set(ns));
    return defineGetters(
      wallets.filter(
        (wallet: MainWalletBase) =>
          !names.some((name: WalletName) =>
            wallet.walletInfo.name.startsWith(name)
          )
      )
    );
  };

  return wallets;
}

export const wallets = createAllWalletList([...keplr]);
