import * as fs from 'fs';
import * as grpc from 'grpc';
import * as bchrpc from '../pb/bchrpc_pb';
import * as bchrpc_grpc from '../pb/bchrpc_grpc_pb';

export class GrpcClient {
    client: bchrpc_grpc.bchrpcClient;

    constructor({ url, rootCertPath, testnet, options }: { url?: string; rootCertPath?: string; testnet?: boolean, options?: object } = {}) {
        let creds = grpc.credentials.createSsl();
        if(rootCertPath) {
            const rootCert = fs.readFileSync(rootCertPath);
            creds = grpc.credentials.createSsl(rootCert)
        }
        if(!url && !testnet) {
            url = "bchd.greyh.at:8335";
        } else if(!url) {
            url = "bchd-testnet.greyh.at:18335";
        }
        if(!options) {
            options = {
                'grpc.max_receive_message_length': -1, // unlimited
            }
        }

        this.client = new bchrpc_grpc.bchrpcClient(url, creds, options)
    }

    getMempoolInfo(): Promise<bchrpc.GetMempoolInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getMempoolInfo(new bchrpc.GetMempoolInfoRequest(), (err, data) => {
                if (err !== null) reject(err);
                else resolve(data!);
            });
        });
    }

    getRawMempool(): Promise<bchrpc.GetMempoolResponse> {
        let req = new bchrpc.GetMempoolRequest();
        req.setFullTransactions(false);
        return new Promise((resolve, reject) => {
            this.client.getMempool(req, (err, data) => {
                if(err !== null) reject(err);
                else resolve(data!);
            });
        });
    }

    getRawTransaction({ hash, reverseOrder }: { hash: string; reverseOrder?: boolean; }): Promise<bchrpc.GetRawTransactionResponse> {
        let req = new bchrpc.GetRawTransactionRequest();
        if(reverseOrder)
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
        else
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        return new Promise((resolve, reject) => {
            this.client.getRawTransaction(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        });
    }

    getTransaction({ hash, reverseOrder }: { hash: string; reverseOrder?: boolean; }): Promise<bchrpc.GetTransactionResponse> {
        let req = new bchrpc.GetTransactionRequest();
        if(reverseOrder)
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
        else
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        return new Promise((resolve, reject) => {
            this.client.getTransaction(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getUnspentTransaction({ hash, vout, reverseOrder, includeMempool }: { hash: string, vout: number, reverseOrder?: boolean, includeMempool?: boolean }): Promise<bchrpc.GetUnspentOutputResponse> {
        let req = new bchrpc.GetUnspentOutputRequest();
        if(includeMempool)
            req.setIncludeMempool(true);
        if(reverseOrder)
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
        else
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        req.setIndex(vout);
        return new Promise((resolve, reject) => {
            this.client.getUnspentOutput(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            });
        })
    }

    getAddressUtxos(address: string): Promise<bchrpc.GetAddressUnspentOutputsResponse> {
        let req = new bchrpc.GetAddressUnspentOutputsRequest()
        req.setAddress(address);
        return new Promise((resolve, reject) => {
            this.client.getAddressUnspentOutputs(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getRawBlock({ index, hash, reverseOrder }: { index?: number, hash?: string; reverseOrder?: boolean; }): Promise<bchrpc.GetRawBlockResponse> {
        let req = new bchrpc.GetRawBlockRequest();
        if(index)
            req.setHeight(index);
        else if(hash) {
            if(reverseOrder)
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
            else
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        } else {
            throw Error("No index or hash provided for block");
        } 
        return new Promise((resolve, reject) => {
            this.client.getRawBlock(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getBlock({ index, hash, reverseOrder, fullTransactions }: { index?: number, hash?: string, reverseOrder?: boolean, fullTransactions?: boolean }): Promise<bchrpc.GetBlockResponse> {
        let req = new bchrpc.GetBlockRequest();
        if(index)
            req.setHeight(index);
        else if(hash) {
            if(reverseOrder)
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
            else
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        } else {
            throw Error("No index or hash provided for block");
        }
        if(fullTransactions)
            req.setFullTransactions(true);
        return new Promise((resolve, reject) => {
            this.client.getBlock(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getBlockInfo({ index, hash, reverseOrder }:{ index?: number, hash?: string, reverseOrder?: boolean }): Promise<bchrpc.GetBlockInfoResponse> {
        let req = new bchrpc.GetBlockInfoRequest()
        if(index) req.setHeight(index);
        else if(hash)
            if(reverseOrder)
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
            else
                req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        else
            throw Error("No index or hash provided for block")
        return new Promise((resolve, reject) => {
            this.client.getBlockInfo(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);            
            })
        })
    }

    getBlockchainInfo(): Promise<bchrpc.GetBlockchainInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getBlockchainInfo(new bchrpc.GetBlockchainInfoRequest(), (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getBlockHeaders(stopHash: string): Promise<bchrpc.GetHeadersResponse> {
        return new Promise((resolve, reject) => {
            let req = new bchrpc.GetHeadersRequest();
            req.setStopHash(new Uint8Array(stopHash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse())
            this.client.getHeaders(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            });
        })
    }

    subscribeTransactions({ includeMempoolAcceptance, includeBlockAcceptance, includeSerializedTxn }: { includeMempoolAcceptance?: boolean, includeBlockAcceptance?: boolean, includeSerializedTxn?: boolean }
        ): Promise<grpc.ClientReadableStream<bchrpc.TransactionNotification>> 
    {
        return new Promise((resolve, reject) => {
            let req = new bchrpc.SubscribeTransactionsRequest();
            includeMempoolAcceptance ? req.setIncludeMempool(true) : req.setIncludeMempool(false);
            includeBlockAcceptance ? req.setIncludeInBlock(true) : req.setIncludeInBlock(false);
            includeSerializedTxn ? req.setSerializeTx(true) : req.setSerializeTx(false);
            let filter = new bchrpc.TransactionFilter();
            filter.setAllTransactions(true);
            req.setSubscribe(filter);
            try {
                resolve(this.client.subscribeTransactions(req));
            } catch(err) {
                reject(err);
            }
        })
    }

    subscribeBlocks({ includeSerializedBlock, includeTxnHashes, includeTxnData }: { includeSerializedBlock?: boolean, includeTxnHashes?: boolean, includeTxnData?: boolean }
        ): Promise<grpc.ClientReadableStream<bchrpc.BlockNotification>>
    {
        return new Promise((resolve, reject) => {
            let req = new bchrpc.SubscribeBlocksRequest();
            includeTxnHashes ? req.setFullBlock(true) : req.setFullBlock(false);
            includeTxnData ? req.setFullTransactions(true) : req.setFullTransactions(false);
            includeSerializedBlock ? req.setSerializeBlock(true) : req.setSerializeBlock(false);
            try {
                resolve(this.client.subscribeBlocks(req));
            } catch(err) {
                reject(err);
            }
        })
    }
}
