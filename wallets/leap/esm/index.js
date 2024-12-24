import { wallets as ext } from '@bongdungyeuem27-kit/leap-extension';
import { wallets as snap } from '@bongdungyeuem27-kit/leap-metamask-cosmos-snap';
import { wallets as mobile } from '@bongdungyeuem27-kit/leap-mobile';
export const wallets = [...ext, ...mobile, ...snap];
