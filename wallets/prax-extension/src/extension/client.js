import { bech32mAddress } from '@penumbra-zone/bech32m/penumbra';
import { ViewService } from '@penumbra-zone/protobuf';
export class PraxClient {
    client;
    constructor(client) {
        this.client = client;
    }
    /** Request the connection to Prax */
    async enable() {
        await this.client.connect();
    }
    /** Request the connection to Prax */
    async connect() {
        await this.client.connect();
    }
    /** Make Prax forget the connection to the connected origin */
    async disconnect() {
        await this.client.disconnect();
    }
    async getAccountInfo() {
        const viewService = this.client.service(ViewService);
        const [appParameters, address] = await Promise.all([
            viewService.appParameters({}),
            viewService.ephemeralAddress({ addressIndex: { account: 0 } }),
        ]);
        if (!appParameters.parameters?.chainId || !address.address) {
            throw new Error('Account info not found');
        }
        return {
            chainId: appParameters.parameters.chainId,
            address: bech32mAddress(address.address),
        };
    }
    /** Get ephemeral Penumbra address and the chainId that is connected to Prax */
    async getSimpleAccount() {
        await this.enable();
        const { address, chainId } = await this.getAccountInfo();
        return {
            namespace: 'cosmos',
            chainId,
            address,
        };
    }
    /** Subscribe to Prax connection state change */
    on(type, listener) {
        this.client.provider.addEventListener(type, listener);
    }
    /** Unsubscribe from Prax connection state change */
    off(type, listener) {
        this.client.provider.removeEventListener(type, listener);
    }
}
