import * as fs from 'fs';
import * as grpc from 'grpc';
import * as bchrpc from '../pb/bchrpc_pb'
import * as bchrpc_grpc from '../pb/bchrpc_grpc_pb'

export class GrpcClient {
    client: bchrpc_grpc.bchrpcClient;

    constructor(url="bchd.greyh.at:8335", rootCertPath:string|null=null) {
        let creds = grpc.credentials.createSsl();
        if(rootCertPath) {
            const rootCert = fs.readFileSync(rootCertPath);
            creds = grpc.credentials.createSsl(rootCert)
        }
        
        this.client = new bchrpc_grpc.bchrpcClient(url, creds)
    }

    getMempoolInfo(): Promise<bchrpc.GetMempoolInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getMempoolInfo(new bchrpc.GetMempoolInfoRequest(), (err, data) => {
                if (err !== null) reject(err);
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

    getRawBlock({ hash, reverseOrder }: { hash: string; reverseOrder?: boolean; }): Promise<bchrpc.GetRawBlockResponse> {
        let req = new bchrpc.GetRawBlockRequest();
        if(reverseOrder)
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))).reverse());
        else
            req.setHash(new Uint8Array(hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))));
        return new Promise((resolve, reject) => {
            this.client.getRawBlock(req, (err, data) => {
                if(err!==null) reject(err);
                else resolve(data!);
            })
        })
    }

    getBlockInfo(index: number): Promise<bchrpc.GetBlockInfoResponse> {
        let req = new bchrpc.GetBlockInfoRequest()
        req.setHeight(index);
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
}
