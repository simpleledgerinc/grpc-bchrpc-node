import * as fs from "fs";
import * as grpc from "grpc";
import { SlpRequiredBurn as ISlpRequiredBurn } from "grpc-bchrpc";
import * as bchrpc_grpc from "../pb/bchrpc_grpc_pb";
import * as bchrpc from "../pb/bchrpc_pb";

export class GrpcClient {
    public client: bchrpc_grpc.bchrpcClient;
    private _testnet?: boolean;
    private _HAS_SLP_INDEX?: boolean;
    private _HAS_NETWORK_INTEGRITY?: boolean;

    constructor({ url, rootCertPath, testnet, options }:
        { url?: string; rootCertPath?: string; testnet?: boolean, options?: object } = {}) {
        let credentials = grpc.credentials.createSsl();
        if (rootCertPath) {
            const rootCert = fs.readFileSync(rootCertPath);
            credentials = grpc.credentials.createSsl(rootCert);
        }
        if (!url && !testnet) {
            url = "bchd.ny1.simpleledger.io";
        } else if (! url) {
            url = "bchd-testnet.greyh.at:18335";
        }
        if (!options) {
            options = {
                "grpc.max_receive_message_length": -1, // unlimited
            };
        }

        this.client = new bchrpc_grpc.bchrpcClient(url, credentials, options);
        this._testnet = testnet;

        this._checkNetworkIntegrity((ok) => {
            if (!ok) {
                console.log("grpc-bchrpc-node: failed network integrity check")
                this.client = new bchrpc_grpc.bchrpcClient("", credentials, {});
            }
        });
    }

    public getMempoolInfo(): Promise<bchrpc.GetMempoolInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getMempoolInfo(new bchrpc.GetMempoolInfoRequest(), (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getRawMempool({
        fullTransactions,
    }: {
        fullTransactions?: boolean,
    } = {}): Promise<bchrpc.GetMempoolResponse> {
        const req = new bchrpc.GetMempoolRequest();
        if (fullTransactions) {
            req.setFullTransactions(true);
        } else {
            req.setFullTransactions(false);
        }
        return new Promise((resolve, reject) => {
            this.client.getMempool(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getRawTransaction({ hash, reversedHashOrder }:
        { hash: string; reversedHashOrder?: boolean; }): Promise<bchrpc.GetRawTransactionResponse> {
        const req = new bchrpc.GetRawTransactionRequest();
        if (reversedHashOrder) {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
        } else {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
        }
        return new Promise((resolve, reject) => {
            this.client.getRawTransaction(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getTransaction({
        hash,
        reversedHashOrder,
        includeTokenMetadata = true,
    }: {
        hash: string;
        reversedHashOrder?: boolean;
        includeTokenMetadata?: boolean;
    }): Promise<bchrpc.GetTransactionResponse> {
        const req = new bchrpc.GetTransactionRequest();
        if (includeTokenMetadata) {
            req.setIncludeTokenMetadata(true);
        }
        if (reversedHashOrder) {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
        } else {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
        }
        return new Promise((resolve, reject) => {
            this.client.getTransaction(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getAddressTransactions({ address, nbSkip, nbFetch, height, hash, reversedHashOrder }:
        { address: string,
            nbSkip?: number, nbFetch?: number,
            height?: number,
            hash?: string,
            reversedHashOrder?: boolean,
        }):
        Promise<bchrpc.GetAddressTransactionsResponse> {
        const req = new bchrpc.GetAddressTransactionsRequest();
        if (nbSkip) {
            req.setNbSkip(nbSkip);
        }
        if (nbFetch) {
            req.setNbFetch(nbFetch);
        }
        if (height) {
            req.setHeight(height);
        }
        if (hash) {
            if (reversedHashOrder) {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
            } else {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
            }
        }
        req.setAddress(address);
        return new Promise((resolve, reject) => {
            this.client.getAddressTransactions(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getUnspentOutput({ hash, vout, reversedHashOrder, includeMempool, includeTokenMetadata = true }:
        { hash: string, vout: number, reversedHashOrder?: boolean,
            includeMempool?: boolean, includeTokenMetadata?: boolean }): Promise<bchrpc.GetUnspentOutputResponse> {
        const req = new bchrpc.GetUnspentOutputRequest();
        if (includeTokenMetadata) {
            req.setIncludeTokenMetadata(true);
        }
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        if (reversedHashOrder) {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
        } else {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
        }
        req.setIndex(vout);
        return new Promise((resolve, reject) => {
            this.client.getUnspentOutput(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getAddressUtxos({ address, includeMempool, includeTokenMetadata = true }:
        { address: string, includeMempool?: boolean, includeTokenMetadata?: boolean } ): Promise<bchrpc.GetAddressUnspentOutputsResponse> {
        const req = new bchrpc.GetAddressUnspentOutputsRequest();
        if (includeTokenMetadata) {
            req.setIncludeTokenMetadata(true);
        }
        req.setAddress(address);
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getAddressUnspentOutputs(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getRawBlock({ index, hash, reversedHashOrder }:
        { index?: number, hash?: string; reversedHashOrder?: boolean; }): Promise<bchrpc.GetRawBlockResponse> {
        const req = new bchrpc.GetRawBlockRequest();
        if (index !== null && index !== undefined) {
            req.setHeight(index);
        } else if (hash) {
            if (reversedHashOrder) {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
            } else {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
            }
        } else {
            throw Error("No index or hash provided for block");
        }
        return new Promise((resolve, reject) => {
            this.client.getRawBlock(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getBlock({ index, hash, reversedHashOrder, fullTransactions }:
        { index?: number, hash?: string, reversedHashOrder?: boolean,
            fullTransactions?: boolean }): Promise<bchrpc.GetBlockResponse> {
        const req = new bchrpc.GetBlockRequest();
        if (index !== null && index !== undefined) {
            req.setHeight(index);
        } else if (hash) {
            if (reversedHashOrder) {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
            } else {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
            }
        } else {
            throw Error("No index or hash provided for block");
        }
        if (fullTransactions) {
            req.setFullTransactions(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlock(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getBlockInfo({ index, hash, reversedHashOrder }:
        { index?: number, hash?: string, reversedHashOrder?: boolean }): Promise<bchrpc.GetBlockInfoResponse> {
        const req = new bchrpc.GetBlockInfoRequest();
        if (index !== null && index !== undefined) { req.setHeight(index); } else if (hash) {
            if (reversedHashOrder) {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
            } else {
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
            }
        } else {
            throw Error("No index or hash provided for block");
        }
        return new Promise((resolve, reject) => {
            this.client.getBlockInfo(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getBlockchainInfo(): Promise<bchrpc.GetBlockchainInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getBlockchainInfo(new bchrpc.GetBlockchainInfoRequest(), (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getBlockHeaders(stopHash: string): Promise<bchrpc.GetHeadersResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetHeadersRequest();
            req.setStopHash(new Uint8Array(stopHash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
            this.client.getHeaders(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public async submitTransaction({
        txnBuf,
        txnHex,
        txn,
        requiredSlpBurns,
        skipSlpValidityChecks = false,
    }: {
        txnBuf?: Buffer,
        txnHex?: string,
        txn?: Uint8Array,
        requiredSlpBurns?: Array<ISlpRequiredBurn>|Array<bchrpc.SlpRequiredBurn>,
        skipSlpValidityChecks?: boolean,
    }): Promise<bchrpc.SubmitTransactionResponse> {
        let tx: string|Uint8Array;
        const req = new bchrpc.SubmitTransactionRequest();

        if (txnBuf) {
            tx = txnBuf.toString("base64");
        } else if (txnHex) {
            tx = Buffer.from(txnHex, "hex").toString("base64");
        } else if (txn) {
            tx = txn;
        } else {
            throw Error("Most provide either Hex string, Buffer, or Uint8Array");
        }

        if (! skipSlpValidityChecks) {
            if (! await this._checkForSlpIndex()) {
                throw Error("Host BCHD instance does not have SLP indexing enabled.");
            }
        } else {
            req.setSkipSlpValidityCheck(true);
        }

        if (requiredSlpBurns) {
            GrpcClient.addRequiredSlpBurns(requiredSlpBurns, req);
        }

        req.setTransaction(tx);
        return new Promise((resolve, reject) => {
            this.client.submitTransaction(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public subscribeTransactions({
        includeMempoolAcceptance,
        includeBlockAcceptance,
        includeSerializedTxn,
        includeOnlySlp,
        slpTokenIds,
        addresses,
        outpoints,
    }: {
        includeMempoolAcceptance?: boolean,
        includeBlockAcceptance?: boolean,
        includeSerializedTxn?: boolean,
        includeOnlySlp?: boolean,
        slpTokenIds?: string[],
        addresses?: string[],
        outpoints?: Array<{ txid: Buffer, vout: number }>,
    } = {}): Promise<grpc.ClientReadableStream<bchrpc.TransactionNotification>> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.SubscribeTransactionsRequest();
            includeMempoolAcceptance ? req.setIncludeMempool(true) : req.setIncludeMempool(false);
            includeBlockAcceptance ? req.setIncludeInBlock(true) : req.setIncludeInBlock(false);
            includeSerializedTxn ? req.setSerializeTx(true) : req.setSerializeTx(false);
            const filter = new bchrpc.TransactionFilter();
            filter.setAllTransactions(true);
            if (addresses) {
                for (const addr of addresses) {
                    filter.addAddresses(addr);
                    filter.setAllTransactions(false);
                }
                if (addresses.length === 0) {
                    addresses = undefined;
                }
            }
            if (outpoints) {
                for (const outpoint of outpoints) {
                    const o = new bchrpc.Transaction.Input.Outpoint();
                    o.setHash(outpoint.txid.reverse());
                    o.setIndex(outpoint.vout);
                    filter.addOutpoints(o);
                    filter.setAllTransactions(false);
                }
                if (outpoints.length === 0) {
                    outpoints = undefined;
                }
            }

            if (slpTokenIds && slpTokenIds.length > 0) {
                filter.setAllTransactions(false);
                filter.setAllSlpTransactions(false);
                slpTokenIds.forEach((tokenId) => filter.addSlpTokenIds(Buffer.from(tokenId, "hex")));
            } else if (includeOnlySlp) {
                filter.setAllTransactions(false);
                filter.setAllSlpTransactions(true);
            }

            req.setSubscribe(filter);
            try {
                resolve(this.client.subscribeTransactions(req));
            } catch (err) {
                reject(err);
            }
        });
    }

    public subscribeBlocks({
        includeSerializedBlock,
        includeTxnHashes,
        includeTxnData,
    }: {
        includeSerializedBlock?: boolean,
        includeTxnHashes?: boolean,
        includeTxnData?: boolean,
    } = {}): Promise<grpc.ClientReadableStream<bchrpc.BlockNotification>> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.SubscribeBlocksRequest();
            includeTxnHashes ? req.setFullBlock(true) : req.setFullBlock(false);
            includeTxnData ? req.setFullTransactions(true) : req.setFullTransactions(false);
            includeSerializedBlock ? req.setSerializeBlock(true) : req.setSerializeBlock(false);
            try {
                resolve(this.client.subscribeBlocks(req));
            } catch (err) {
                reject(err);
            }
        });
    }

    public async checkSlpTransaction({
        txnBuf,
        txnHex,
        txn,
        requiredSlpBurns,
        useSpecValidityJudgement,
    }: {
        txnBuf?: Buffer,
        txnHex?: string,
        txn?: Uint8Array,
        requiredSlpBurns?: bchrpc.SlpRequiredBurn[]|ISlpRequiredBurn[],
        useSpecValidityJudgement?: boolean,
    } = {}): Promise<bchrpc.CheckSlpTransactionResponse> {
        let tx: string|Uint8Array;
        const req = new bchrpc.CheckSlpTransactionRequest();

        if (txnBuf) {
            tx = txnBuf.toString("base64");
        } else if (txnHex) {
            tx = Buffer.from(txnHex, "hex").toString("base64");
        } else if (txn) {
            tx = txn;
        } else {
            throw Error("Most provide either Hex string, Buffer, or Uint8Array");
        }

        if (useSpecValidityJudgement) {
            req.setUseSpecValidityJudgement(true);
        } else if (requiredSlpBurns) {
            GrpcClient.addRequiredSlpBurns(requiredSlpBurns, req);
        }
        req.setTransaction(tx);
        return new Promise((resolve, reject) => {
            this.client.checkSlpTransaction(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getTokenMetadata(tokenIds: string[]|Buffer[]): Promise<bchrpc.GetSlpTokenMetadataResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetSlpTokenMetadataRequest();
            if (typeof tokenIds[0] === "string") {
                (tokenIds as string[]).forEach((id) => req.addTokenIds(Buffer.from(id, "hex")));
            } else {
                (tokenIds as Buffer[]).forEach((id) => req.addTokenIds(id));
            }

            this.client.getSlpTokenMetadata(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getTrustedSlpValidation({
        txos,
        reversedHashOrder,
        includeGraphSearchCount,
    }: {
        txos: Array<{ hash: string; vout: number; gsKnownValidHashes?: string[]}>,
        reversedHashOrder?: boolean,
        includeGraphSearchCount?: boolean,
    }): Promise<bchrpc.GetSlpTrustedValidationResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetSlpTrustedValidationRequest();

            // add txos
            for (const txo of txos) {
                const query = new bchrpc.GetSlpTrustedValidationRequest.Query();
                let hash = Buffer.from(txo.hash, "hex");
                if (reversedHashOrder) {
                    hash = hash.slice().reverse();
                }
                if (txo.gsKnownValidHashes) {
                    req.setIncludeGraphsearchCount(true);
                    txo.gsKnownValidHashes.forEach((hash) => {
                        let hashBuf = Buffer.from(hash, "hex");
                        if (reversedHashOrder) {
                            hashBuf = hashBuf.slice().reverse();
                        }
                        query.addGraphsearchValidHashes(hashBuf);
                    });
                }
                query.setPrevOutHash(hash);
                query.setPrevOutVout(txo.vout);
                req.addQueries(query);
            }

            if (includeGraphSearchCount) {
                req.setIncludeGraphsearchCount(true);
            }

            this.client.getSlpTrustedValidation(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getParsedSlpScript(script: string|Buffer): Promise<bchrpc.GetSlpParsedScriptResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetSlpParsedScriptRequest();
            if (typeof script === "string") {
                req.setSlpOpreturnScript(Buffer.from(script, "hex"));
            } else {
                req.setSlpOpreturnScript(script);
            }
            this.client.getSlpParsedScript(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getGraphSearchFor({ hash, reversedHashOrder, knownValidHashes }:
        { hash: string, reversedHashOrder: boolean, knownValidHashes?: string[] }): Promise<bchrpc.GetSlpGraphSearchResponse> {
        const req = new bchrpc.GetSlpGraphSearchRequest();
        if (reversedHashOrder) {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
        } else {
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
        }
        if (knownValidHashes) {
            if (reversedHashOrder) {
                knownValidHashes.forEach((hash) => {
                    req.addValidHashes(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse());
                });
            } else {
                knownValidHashes.forEach((hash) => {
                    req.addValidHashes(new Uint8Array(hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))));
                });
            }
        }
        return new Promise((resolve, reject) => {
            this.client.getSlpGraphSearch(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    private async _checkForSlpIndex(): Promise<boolean> {
        if (this._HAS_SLP_INDEX !== undefined) {
            return this._HAS_SLP_INDEX;
        } else {
            const info = await this.getBlockchainInfo();
            this._HAS_SLP_INDEX = info.getSlpIndex();
            return this._HAS_SLP_INDEX;
        }
    }

    private async _checkNetworkIntegrity(callback: (result: boolean) => any): Promise<boolean> {
        if (typeof this._HAS_NETWORK_INTEGRITY !== "boolean") {
            this._HAS_NETWORK_INTEGRITY = false;
            let res: bchrpc.GetBlockInfoResponse|undefined;
            if (! this._testnet) {
                try { res = await this.getBlockInfo({ hash: "000000000000000002ebadda97db6323ebfab5f3dc965b10386794635e760e21", reversedHashOrder: true }); } catch (_) { }
                if (res) { this._HAS_NETWORK_INTEGRITY = true; }
            } else {
                try {
                    res = await this.getBlockInfo({ hash: "000000008bf44a528a09d203203a6a97c165cf53a92ecc27aed0b49b86a19564", reversedHashOrder: true });
                } catch (_) { this._HAS_NETWORK_INTEGRITY = true; }
            }
        }
        callback(this._HAS_NETWORK_INTEGRITY);
        return this._HAS_NETWORK_INTEGRITY;
    }

    private static addRequiredSlpBurns(
        requiredSlpBurns: Array<bchrpc.SlpRequiredBurn|ISlpRequiredBurn>, req: bchrpc.CheckSlpTransactionRequest|bchrpc.SubmitTransactionRequest) {
        const burns: bchrpc.SlpRequiredBurn[] = [];

        // convert a generic burn requirements object to pb type
        requiredSlpBurns.forEach((burn: ISlpRequiredBurn | bchrpc.SlpRequiredBurn, i: number) => {
            if (!(burn as bchrpc.SlpRequiredBurn).setAmount) {
                const pbBurn = new bchrpc.SlpRequiredBurn();
                const genericBurn = burn as ISlpRequiredBurn;
                pbBurn.setTokenId(genericBurn.tokenId);
                pbBurn.setTokenType(genericBurn.tokenType);
                if (genericBurn.amount) {
                    pbBurn.setAmount(genericBurn.amount);
                }
                if (genericBurn.outpointHash) {
                    if (!genericBurn.outpointVout) {
                        throw Error("missing value for 'outpointVout'");
                    }
                    const op = new bchrpc.Transaction.Input.Outpoint();
                    op.setHash(genericBurn.outpointHash); // check for reversed hash?
                    op.setIndex(genericBurn.outpointVout);
                    pbBurn.setOutpoint(op);
                }
                if (genericBurn.setMintBatonVout) {
                    pbBurn.setMintBatonVout(genericBurn.setMintBatonVout);
                }
                burns.push(pbBurn);
            } else {
                burns.push(burn as bchrpc.SlpRequiredBurn);
            }
        });

        for (const burn of burns) {
            req.addRequiredSlpBurns(burn);
        }
    }
}
