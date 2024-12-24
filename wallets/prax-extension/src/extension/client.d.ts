import { WalletClient } from '@cosmos-kit/core';
import { PenumbraClient } from '@penumbra-zone/client';
export declare class PraxClient implements WalletClient {
    readonly client: PenumbraClient;
    constructor(client: PenumbraClient);
    /** Request the connection to Prax */
    enable(): Promise<void>;
    /** Request the connection to Prax */
    connect(): Promise<void>;
    /** Make Prax forget the connection to the connected origin */
    disconnect(): Promise<void>;
    private getAccountInfo;
    /** Get ephemeral Penumbra address and the chainId that is connected to Prax */
    getSimpleAccount(): Promise<{
        namespace: string;
        chainId: string;
        address: string;
    }>;
    /** Subscribe to Prax connection state change */
    on(type: 'penumbrastate', listener: EventListenerOrEventListenerObject): void;
    /** Unsubscribe from Prax connection state change */
    off(type: 'penumbrastate', listener: EventListenerOrEventListenerObject): void;
}
