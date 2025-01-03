"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletManager = void 0;
const cosmiframe_1 = require("@dao-dao/cosmiframe");
const bowser_1 = __importDefault(require("bowser"));
const events_1 = __importDefault(require("events"));
const bases_1 = require("./bases");
const cosmiframe_2 = require("./cosmiframe");
const constants_1 = require("./cosmiframe/constants");
const repository_1 = require("./repository");
const types_1 = require("./types");
const utils_1 = require("./utils");
class WalletManager extends bases_1.StateBase {
    chainRecords = [];
    walletRepos = [];
    defaultNameService = 'icns';
    mainWallets = [];
    coreEmitter;
    walletConnectOptions;
    session;
    repelWallet = true; // only allow one wallet type to connect at one time. i.e. you cannot connect keplr and cosmostation at the same time
    isLazy; // stands for `globalIsLazy` setting
    throwErrors;
    subscribeConnectEvents;
    cosmiframeEnabled;
    _reconnectMap = {};
    constructor(chains, wallets, logger, throwErrors, subscribeConnectEvents = true, allowedCosmiframeParentOrigins, assetLists, defaultNameService, walletConnectOptions, signerOptions, endpointOptions, sessionOptions) {
        super();
        this.throwErrors = throwErrors;
        this.subscribeConnectEvents = subscribeConnectEvents;
        this.coreEmitter = new events_1.default();
        this.logger = logger;
        if (defaultNameService)
            this.defaultNameService = defaultNameService;
        this.session = new utils_1.Session({
            duration: 1800000,
            callback: () => {
                this.mainWallets.forEach((w) => w.disconnectAll(false));
                window?.localStorage.removeItem('cosmos-kit@2:core//accounts');
                window?.localStorage.removeItem('cosmos-kit@2:core//current-wallet');
            },
            ...sessionOptions,
        });
        this.walletConnectOptions = walletConnectOptions;
        this.cosmiframeEnabled =
            (0, cosmiframe_1.isInIframe)() && !!allowedCosmiframeParentOrigins?.length;
        // Add Cosmiframe wallet to beginning of list if enabled.
        wallets = [
            ...(this.cosmiframeEnabled
                ? [(0, cosmiframe_2.makeCosmiframeWallet)(allowedCosmiframeParentOrigins)]
                : []),
            ...wallets,
        ];
        wallets.forEach(({ walletName }) => (this._reconnectMap[walletName] = () => this._reconnect(walletName, true)));
        this.init(chains, assetLists, wallets, walletConnectOptions, signerOptions, endpointOptions);
    }
    init(chains, assetLists, wallets, walletConnectOptions, signerOptions, endpointOptions) {
        this.logger.info(`${chains.length} chains and ${wallets.length} wallets are provided!`);
        this.isLazy = endpointOptions?.isLazy;
        this.chainRecords = chains.map((chain) => {
            const chainName = typeof chain === 'string' ? chain : chain.chain_name;
            const converted = (0, utils_1.convertChain)(chain, assetLists, signerOptions, endpointOptions?.endpoints?.[chainName], this.isLazy, this.logger);
            return converted;
        });
        this.mainWallets = wallets.map((wallet) => {
            wallet.logger = this.logger;
            wallet.throwErrors = this.throwErrors;
            wallet.session = this.session;
            wallet.walletConnectOptions = this.walletConnectOptions;
            wallet?.setChains(this.chainRecords);
            return wallet;
        });
        this.chainRecords.forEach((chainRecord, index) => {
            const repo = new repository_1.WalletRepo(chainRecord, wallets.map(({ getChainWallet }) => getChainWallet(chainRecord.name)));
            repo.logger = this.logger;
            repo.repelWallet = this.repelWallet;
            repo.session = this.session;
            this.walletRepos.push(repo);
            if (repo.fetchInfo) {
                this.chainRecords[index] = repo.chainRecord;
            }
        });
        this.checkEndpoints(endpointOptions?.endpoints);
    }
    checkEndpoints(endpoints) {
        Object.keys(endpoints || {}).map((key) => {
            if (this.chainRecords.findIndex((c) => c.name === key) === -1) {
                this.logger?.warn(`You are providing endpointOptions with unrecognized chain NAME ${key} (NOT found such chain in ChainProvider property "chains")`);
            }
        });
    }
    setWalletRepel(value) {
        this.repelWallet = value;
        this.walletRepos.forEach((repo) => (repo.repelWallet = value));
        window?.localStorage.setItem('cosmos-kit@2:core//repel-wallet', value.toString());
    }
    addEndpoints = (endpoints) => {
        this.mainWallets.forEach((mainWallet) => {
            mainWallet.addEnpoints(endpoints);
        });
    };
    addChains = (chains, assetLists, signerOptions, endpoints) => {
        const newChainRecords = chains.map((chain) => {
            const chainName = typeof chain === 'string' ? chain : chain.chain_name;
            return (0, utils_1.convertChain)(chain, assetLists, signerOptions, endpoints?.[chainName], this.isLazy, this.logger);
        });
        newChainRecords.forEach((chainRecord) => {
            const index = this.chainRecords.findIndex((chainRecord2) => chainRecord2.name === chainRecord.name);
            if (index == -1) {
                this.chainRecords.push(chainRecord);
            }
            else {
                this.chainRecords[index] = chainRecord;
            }
        });
        this.checkEndpoints(endpoints);
        this.mainWallets.forEach((wallet) => {
            wallet.setChains(newChainRecords, false);
        });
        newChainRecords.forEach((chainRecord, i) => {
            const repo = new repository_1.WalletRepo(chainRecord, this.mainWallets.map(({ getChainWallet }) => getChainWallet(chainRecord.name)));
            repo.setActions({
                viewOpen: this.actions?.viewOpen,
                viewWalletRepo: this.actions?.viewWalletRepo,
            });
            repo.wallets.forEach((w) => {
                w.setActions({
                    data: this.actions?.data,
                    state: this.actions?.state,
                    message: this.actions?.message,
                });
            });
            repo.logger = this.logger;
            repo.repelWallet = this.repelWallet;
            repo.session = this.session;
            if (repo.fetchInfo) {
                this.chainRecords[i] = repo.chainRecord;
            }
            const index = this.walletRepos.findIndex((repo2) => repo2.chainName === repo.chainName);
            if (index == -1) {
                this.walletRepos.push(repo);
            }
            else {
                this.walletRepos[index] = repo;
            }
        });
    };
    on = (event, handler) => {
        this.coreEmitter.on(event, handler);
    };
    off = (event, handler) => {
        this.coreEmitter.off(event, handler);
    };
    get activeRepos() {
        return this.walletRepos.filter((repo) => repo.isActive === true);
    }
    getMainWallet = (walletName) => {
        const wallet = this.mainWallets.find((w) => w.walletName === walletName);
        if (!wallet) {
            throw new utils_1.WalletNotProvidedError(walletName);
        }
        return wallet;
    };
    getWalletRepo = (chainName) => {
        const walletRepo = this.walletRepos.find((wr) => wr.chainName === chainName);
        if (!walletRepo) {
            throw new Error(`Chain ${chainName} is not provided.`);
        }
        return walletRepo;
    };
    getChainWallet = (chainName, walletName) => {
        const chainWallet = this.getMainWallet(walletName).getChainWallet(chainName);
        if (!chainWallet) {
            throw new Error(`${chainName} is not provided!`);
        }
        return chainWallet;
    };
    getChainRecord = (chainName) => {
        const chainRecord = this.chainRecords.find((c) => c.name === chainName);
        if (!chainRecord) {
            throw new Error(`${chainName} is not provided!`);
        }
        return chainRecord;
    };
    // get chain logo
    getChainLogo = (chainName) => {
        const chainRecord = this.getChainRecord(chainName);
        return (
        // until chain_registry fix this
        // chainRecord?.chain.logo_URIs?.svg ||
        // chainRecord?.chain.logo_URIs?.png ||
        // chainRecord?.chain.logo_URIs?.jpeg ||
        chainRecord?.assetList?.assets[0]?.logo_URIs?.svg ||
            chainRecord?.assetList?.assets[0]?.logo_URIs?.png ||
            undefined);
    };
    getNameService = async (chainName) => {
        let _chainName;
        if (!chainName) {
            if (!this.defaultNameService) {
                throw new Error('defaultNameService is undefined');
            }
            const { getNameServiceRegistryFromName } = await Promise.resolve().then(() => __importStar(require('./utils')));
            const registry = getNameServiceRegistryFromName(this.defaultNameService);
            if (!registry) {
                throw new Error('Unknown defaultNameService ' + this.defaultNameService);
            }
            _chainName = registry.chainName;
        }
        else {
            _chainName = chainName;
        }
        return await this.getWalletRepo(_chainName).getNameService();
    };
    _reconnect = async (walletName, checkConnection = false) => {
        if (checkConnection &&
            this.getMainWallet(walletName)?.isWalletDisconnected) {
            return;
        }
        this.logger?.debug('[Event Emit] `refresh_connection` (manager)');
        this.coreEmitter.emit('refresh_connection');
        await this.getMainWallet(walletName).connect();
        await this.getMainWallet(walletName)
            .getChainWalletList(true)[0]
            ?.connect(true);
    };
    _restoreAccounts = async () => {
        const walletName = 
        // If Cosmiframe enabled, use it by default instead of stored wallet.
        this.cosmiframeEnabled
            ? constants_1.COSMIFRAME_WALLET_ID
            : window.localStorage.getItem('cosmos-kit@2:core//current-wallet');
        if (walletName) {
            try {
                const mainWallet = this.getMainWallet(walletName);
                mainWallet.activate();
                if (mainWallet.clientMutable.state === types_1.State.Done) {
                    const accountsStr = window.localStorage.getItem('cosmos-kit@2:core//accounts');
                    if (accountsStr && accountsStr !== '[]') {
                        const accounts = JSON.parse(accountsStr);
                        accounts.forEach((data) => {
                            const chainWallet = mainWallet
                                .getChainWalletList(false)
                                .find((w) => w.chainRecord.chain?.chain_id === data.chainId &&
                                w.namespace === data.namespace);
                            chainWallet?.activate();
                            if (mainWallet.walletInfo.mode === 'wallet-connect') {
                                chainWallet?.setData(data);
                                chainWallet?.setState(types_1.State.Done);
                            }
                        });
                        mainWallet.setState(types_1.State.Done);
                    }
                }
                if (mainWallet.walletInfo.mode !== 'wallet-connect') {
                    await this._reconnect(walletName);
                }
            }
            catch (error) {
                if (error instanceof utils_1.WalletNotProvidedError) {
                    this.logger?.warn(error.message);
                }
                else {
                    throw error;
                }
            }
        }
    };
    _handleCosmiframeKeystoreChangeEvent = (event) => {
        if (typeof event.data === 'object' &&
            'event' in event.data &&
            event.data.event === constants_1.COSMIFRAME_KEYSTORECHANGE_EVENT) {
            // Dispatch event to our window.
            window.dispatchEvent(new Event(constants_1.COSMIFRAME_KEYSTORECHANGE_EVENT));
            // Reconnect if the parent updates.
            this._reconnect(constants_1.COSMIFRAME_WALLET_ID);
        }
    };
    onMounted = async () => {
        if (typeof window === 'undefined')
            return;
        // If Cosmiframe enabled, rebroadcast keystore change event messages as
        // events and reconnect if the parent changes. Since the outer window can be
        // a different origin (and it most likely is), it cannot dispatch events on
        // our (the iframe's) window. Thus, it posts a message with the event name
        // to our window and we broadcast it.
        if (this.cosmiframeEnabled) {
            window.addEventListener('message', this._handleCosmiframeKeystoreChangeEvent);
        }
        const parser = bowser_1.default.getParser(window.navigator.userAgent);
        const env = {
            browser: parser.getBrowserName(true),
            device: (parser.getPlatform().type || 'desktop'),
            os: parser.getOSName(true),
        };
        this.setEnv(env);
        this.walletRepos.forEach((repo) => repo.setEnv(env));
        await Promise.all(this.mainWallets.map(async (wallet) => {
            wallet.setEnv(env);
            wallet.emitter?.emit('broadcast_env', env);
            if (this.subscribeConnectEvents) {
                wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
                    window.addEventListener(eventName, this._reconnectMap[wallet.walletName]);
                    this.logger?.debug(`Add "${eventName}" event listener to window`);
                });
                wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
                    wallet.client?.on?.(eventName, this._reconnectMap[wallet.walletName]);
                    this.logger?.debug(`Add "${eventName}" event listener to wallet client ${wallet.walletPrettyName}`);
                });
            }
            if (wallet.walletInfo.mode === 'wallet-connect') {
                await wallet.initClient(this.walletConnectOptions);
            }
            else {
                await wallet.initClient();
            }
        }));
        await this._restoreAccounts();
    };
    onUnmounted = () => {
        if (typeof window === 'undefined') {
            return;
        }
        // If using Cosmiframe, stop listening for keystore change event.
        if (this.cosmiframeEnabled) {
            window.removeEventListener('message', this._handleCosmiframeKeystoreChangeEvent);
        }
        this.mainWallets.forEach((wallet) => {
            wallet.walletInfo.connectEventNamesOnWindow?.forEach((eventName) => {
                window.removeEventListener(eventName, this._reconnectMap[wallet.walletName]);
            });
            wallet.walletInfo.connectEventNamesOnClient?.forEach(async (eventName) => {
                wallet.client?.off?.(eventName, this._reconnectMap[wallet.walletName]);
            });
        });
    };
}
exports.WalletManager = WalletManager;
