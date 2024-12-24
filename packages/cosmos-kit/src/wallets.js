import { wallets as coin98Extension } from '@bongdungyeuem27-kit/coin98-extension';
import { wallets as compassExtension } from '@bongdungyeuem27-kit/compass-extension';
import { wallets as okxwalletExtension } from '@bongdungyeuem27-kit/okxwallet-extension';
import { wallets as cosmostationExtension } from '@bongdungyeuem27-kit/cosmostation-extension';
import { wallets as cosmostationMobile } from '@bongdungyeuem27-kit/cosmostation-mobile';
import { wallets as frontierExtension } from '@bongdungyeuem27-kit/frontier-extension';
import { wallets as keplrExtension } from '@bongdungyeuem27-kit/keplr-extension';
import { wallets as keplrMobile } from '@bongdungyeuem27-kit/keplr-mobile';
import { wallets as owalletExtension } from '@bongdungyeuem27-kit/owallet-extension';
import { wallets as owalletMobile } from '@bongdungyeuem27-kit/owallet-mobile';
import { wallets as leapExtension } from '@bongdungyeuem27-kit/leap-extension';
import { wallets as leapMobile } from '@bongdungyeuem27-kit/leap-mobile';
import { wallets as leapMetamaskCosmosSnap } from '@bongdungyeuem27-kit/leap-metamask-cosmos-snap';
import { wallets as ledgerUSB } from '@bongdungyeuem27-kit/ledger';
import { wallets as omniMobile } from '@bongdungyeuem27-kit/omni-mobile';
import { wallets as finExtension } from '@bongdungyeuem27-kit/fin-extension';
import { wallets as stationExtension } from '@bongdungyeuem27-kit/station-extension';
import { wallets as trustExtension } from '@bongdungyeuem27-kit/trust-extension';
import { wallets as trustMobile } from '@bongdungyeuem27-kit/trust-mobile';
import { wallets as shellExtension } from '@bongdungyeuem27-kit/shell-extension';
import { wallets as vectisExtension } from '@bongdungyeuem27-kit/vectis-extension';
import { wallets as ctrlExtension } from '@bongdungyeuem27-kit/ctrl-extension';
import { wallets as exodusExtension } from '@bongdungyeuem27-kit/exodus-extension';
import { wallets as tailwindWallet } from '@bongdungyeuem27-kit/tailwind';
import { wallets as galaxyStationExtension } from '@bongdungyeuem27-kit/galaxy-station-extension';
import { wallets as cdcwalletExtension } from '@bongdungyeuem27-kit/cdcwallet-extension';
export function createWalletList(extension, mobile, snap) {
    const list = [extension, mobile, snap].filter((wallet) => Boolean(wallet));
    list.mobile = mobile;
    list.extension = extension;
    return list;
}
export const keplr = createWalletList(keplrExtension[0], keplrMobile[0]);
export const cosmostation = createWalletList(cosmostationExtension[0], cosmostationMobile[0]);
export const ledger = ledgerUSB;
export const leap = createWalletList(leapExtension[0], leapMobile[0], leapMetamaskCosmosSnap[0]);
export const station = createWalletList(stationExtension[0], null);
export const okxwallet = createWalletList(okxwalletExtension[0], null);
export const trust = createWalletList(trustExtension[0], trustMobile[0]);
export const ctrl = createWalletList(ctrlExtension[0], null);
export const vectis = createWalletList(vectisExtension[0], null);
export const frontier = createWalletList(frontierExtension[0], null);
export const fin = createWalletList(finExtension[0], null);
export const omni = createWalletList(null, omniMobile[0]);
export const shell = createWalletList(shellExtension[0], null);
export const coin98 = createWalletList(coin98Extension[0], null);
export const compass = createWalletList(compassExtension[0], null);
export const exodus = createWalletList(exodusExtension[0], null);
export const tailwind = createWalletList(tailwindWallet[0], null);
export const owallet = createWalletList(owalletExtension[0], owalletMobile[0]);
export const galaxystation = createWalletList(galaxyStationExtension[0], null);
export const cdcwallet = createWalletList(cdcwalletExtension[0], null);
export function defineGetters(wallets) {
    return Object.defineProperties(wallets, {
        mobile: {
            get() {
                return this.filter((wallet) => wallet.isModeWalletConnect);
            },
        },
        extension: {
            get() {
                return this.filter((wallet) => wallet.isModeExtension);
            },
        },
    });
}
export function createAllWalletList(ws) {
    const wallets = ws.slice();
    wallets.keplr = keplr;
    wallets.cosmostation = cosmostation;
    wallets.ledger = ledger;
    wallets.okxwallet = okxwallet;
    wallets.station = station;
    wallets.leap = leap;
    wallets.trust = trust;
    wallets.ctrl = ctrl;
    wallets.vectis = vectis;
    wallets.frontier = frontier;
    wallets.fin = fin;
    wallets.omni = omni;
    wallets.coin98 = coin98;
    wallets.compass = compass;
    wallets.exodus = exodus;
    wallets.tailwind = tailwind;
    wallets.owallet = owallet;
    wallets.galaxystation = galaxystation;
    wallets.cdcwallet = cdcwallet;
    defineGetters(wallets);
    wallets.for = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(names
            .map((name) => wallets.filter((wallet) => wallet.walletInfo.name.startsWith(name)))
            .flat());
    };
    wallets.not = function (...ns) {
        const names = Array.from(new Set(ns));
        return defineGetters(wallets.filter((wallet) => !names.some((name) => wallet.walletInfo.name.startsWith(name))));
    };
    return wallets;
}
export const wallets = createAllWalletList([
    ...keplr,
    ...leap,
    ...ledger,
    ...okxwallet,
    ...station,
    ...trust,
    ...cosmostation,
    ...ctrl,
    ...vectis,
    ...frontier,
    ...fin,
    ...omni,
    ...coin98,
    ...compass,
    ...exodus,
    ...tailwind,
    ...owallet,
    ...galaxystation,
    ...cdcwallet,
]);
