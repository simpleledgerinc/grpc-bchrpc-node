import * as fs from "fs";
import * as grpc from "grpc";
import * as bchrpc_grpc from "../pb/bchrpc_grpc_pb";
import * as bchrpc from "../pb/bchrpc_pb";

export class GrpcClient {
    public client: bchrpc_grpc.bchrpcClient;
    private _HAS_SLP_INDEX?: boolean;

    constructor({ url, rootCertPath, testnet, options }:
        { url?: string; rootCertPath?: string; testnet?: boolean, options?: object } = {}) {
        let creds = grpc.credentials.createSsl();
        if (rootCertPath) {
            const rootCert = fs.readFileSync(rootCertPath);
            creds = grpc.credentials.createSsl(rootCert);
        }
        if (!url && !testnet) {
            url = "bchd.greyh.at:8335";
        } else if (!url) {
            url = "bchd-testnet.greyh.at:18335";
        }
        if (!options) {
            options = {
                "grpc.max_receive_message_length": -1, // unlimited
            };
        }

        this.client = new bchrpc_grpc.bchrpcClient(url, creds, options);
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
        requiredSlpBurns?: bchrpc.SlpRequiredBurn[],
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
            for (const burn of requiredSlpBurns) {
                req.addRequiredSlpBurns(burn);
            }
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
    }: {
        txnBuf?: Buffer,
        txnHex?: string,
        txn?: Uint8Array,
        requiredSlpBurns?: bchrpc.SlpRequiredBurn[],
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

        if (requiredSlpBurns) {
            for (const burn of requiredSlpBurns) {
                req.addRequiredSlpBurns(burn);
            }
        }
        req.setTransaction(tx);
        return new Promise((resolve, reject) => {
            this.client.checkSlpTransaction(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getTokenMetadata(tokenIds: string[]|Buffer[]): Promise<bchrpc.GetTokenMetadataResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetTokenMetadataRequest();
            if (typeof tokenIds[0] === "string") {
                (tokenIds as string[]).forEach((id) => req.addTokenIds(Buffer.from(id, "hex")));
            } else {
                (tokenIds as Buffer[]).forEach((id) => req.addTokenIds(id));
            }

            this.client.getTokenMetadata(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getTrustedSlpValidation({
        txos,
        reversedHashOrder,
        functionaryInfo,
    }: {
        txos: Array<{ hash: string; vout: number; }>,
        reversedHashOrder?: boolean,
        functionaryInfo?: {
            pubKey: string|Buffer,
            type: bchrpc.GetTrustedSlpValidationRequest.Functionary.MessageType,
            sigType: bchrpc.GetTrustedSlpValidationRequest.Functionary.SignatureType },
    }): Promise<bchrpc.GetTrustedSlpValidationResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetTrustedSlpValidationRequest();

            // add txos
            for (const txo of txos) {
                const query = new bchrpc.GetTrustedSlpValidationRequest.Query();
                let hash = Buffer.from(txo.hash, "hex");
                if (reversedHashOrder) {
                    hash = hash.slice().reverse();
                }
                query.setPrevOutHash(hash);
                query.setPrevOutVout(txo.vout);
                req.addQueries(query);
            }

            // add functionary info
            if (functionaryInfo) {
                const info = new bchrpc.GetTrustedSlpValidationRequest.Functionary();
                info.setType(functionaryInfo.type);
                info.setSigType(functionaryInfo.sigType);
                if (typeof functionaryInfo.pubKey === "string") {
                    info.setPublicKey(Buffer.from(functionaryInfo.pubKey, "hex"));
                } else {
                    info.setPublicKey(functionaryInfo.pubKey);
                }
                req.setFunctionaryInfo(info);
            }

            this.client.getTrustedSlpValidation(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getBip44HdAddress({ xpub, isChange, addressIndex }:
        {xpub: string, isChange: boolean, addressIndex: number }): Promise<bchrpc.GetBip44HdAddressResponse> {

        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetBip44HdAddressRequest();
            req.setXpub(xpub);
            req.setChange(isChange);
            req.setAddressIndex(addressIndex);

            this.client.getBip44HdAddress(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getParsedSlpScript(script: string|Buffer): Promise<bchrpc.GetParsedSlpScriptResponse> {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.GetParsedSlpScriptRequest();
            if (typeof script === "string") {
                req.setSlpOpreturnScript(Buffer.from(script, "hex"));
            } else {
                req.setSlpOpreturnScript(script);
            }
            this.client.getParsedSlpScript(req, (err, data) => {
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
}
