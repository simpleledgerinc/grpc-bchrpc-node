// package: pb
// file: pb/bchrpc.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetMempoolInfoRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMempoolInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMempoolInfoRequest): GetMempoolInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMempoolInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMempoolInfoRequest;
    static deserializeBinaryFromReader(message: GetMempoolInfoRequest, reader: jspb.BinaryReader): GetMempoolInfoRequest;
}

export namespace GetMempoolInfoRequest {
    export type AsObject = {
    }
}

export class GetMempoolInfoResponse extends jspb.Message { 
    getSize(): number;
    setSize(value: number): GetMempoolInfoResponse;

    getBytes(): number;
    setBytes(value: number): GetMempoolInfoResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMempoolInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMempoolInfoResponse): GetMempoolInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMempoolInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMempoolInfoResponse;
    static deserializeBinaryFromReader(message: GetMempoolInfoResponse, reader: jspb.BinaryReader): GetMempoolInfoResponse;
}

export namespace GetMempoolInfoResponse {
    export type AsObject = {
        size: number,
        bytes: number,
    }
}

export class GetMempoolRequest extends jspb.Message { 
    getFullTransactions(): boolean;
    setFullTransactions(value: boolean): GetMempoolRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMempoolRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMempoolRequest): GetMempoolRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMempoolRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMempoolRequest;
    static deserializeBinaryFromReader(message: GetMempoolRequest, reader: jspb.BinaryReader): GetMempoolRequest;
}

export namespace GetMempoolRequest {
    export type AsObject = {
        fullTransactions: boolean,
    }
}

export class GetMempoolResponse extends jspb.Message { 
    clearTransactionDataList(): void;
    getTransactionDataList(): Array<GetMempoolResponse.TransactionData>;
    setTransactionDataList(value: Array<GetMempoolResponse.TransactionData>): GetMempoolResponse;
    addTransactionData(value?: GetMempoolResponse.TransactionData, index?: number): GetMempoolResponse.TransactionData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMempoolResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMempoolResponse): GetMempoolResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMempoolResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMempoolResponse;
    static deserializeBinaryFromReader(message: GetMempoolResponse, reader: jspb.BinaryReader): GetMempoolResponse;
}

export namespace GetMempoolResponse {
    export type AsObject = {
        transactionDataList: Array<GetMempoolResponse.TransactionData.AsObject>,
    }


    export class TransactionData extends jspb.Message { 

        hasTransactionHash(): boolean;
        clearTransactionHash(): void;
        getTransactionHash(): Uint8Array | string;
        getTransactionHash_asU8(): Uint8Array;
        getTransactionHash_asB64(): string;
        setTransactionHash(value: Uint8Array | string): TransactionData;


        hasTransaction(): boolean;
        clearTransaction(): void;
        getTransaction(): Transaction | undefined;
        setTransaction(value?: Transaction): TransactionData;


        getTxidsOrTxsCase(): TransactionData.TxidsOrTxsCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TransactionData.AsObject;
        static toObject(includeInstance: boolean, msg: TransactionData): TransactionData.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TransactionData, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TransactionData;
        static deserializeBinaryFromReader(message: TransactionData, reader: jspb.BinaryReader): TransactionData;
    }

    export namespace TransactionData {
        export type AsObject = {
            transactionHash: Uint8Array | string,
            transaction?: Transaction.AsObject,
        }

        export enum TxidsOrTxsCase {
            TXIDS_OR_TXS_NOT_SET = 0,
        
    TRANSACTION_HASH = 1,

    TRANSACTION = 2,

        }

    }

}

export class GetBlockchainInfoRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockchainInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockchainInfoRequest): GetBlockchainInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockchainInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockchainInfoRequest;
    static deserializeBinaryFromReader(message: GetBlockchainInfoRequest, reader: jspb.BinaryReader): GetBlockchainInfoRequest;
}

export namespace GetBlockchainInfoRequest {
    export type AsObject = {
    }
}

export class GetBlockchainInfoResponse extends jspb.Message { 
    getBitcoinNet(): GetBlockchainInfoResponse.BitcoinNet;
    setBitcoinNet(value: GetBlockchainInfoResponse.BitcoinNet): GetBlockchainInfoResponse;

    getBestHeight(): number;
    setBestHeight(value: number): GetBlockchainInfoResponse;

    getBestBlockHash(): Uint8Array | string;
    getBestBlockHash_asU8(): Uint8Array;
    getBestBlockHash_asB64(): string;
    setBestBlockHash(value: Uint8Array | string): GetBlockchainInfoResponse;

    getDifficulty(): number;
    setDifficulty(value: number): GetBlockchainInfoResponse;

    getMedianTime(): number;
    setMedianTime(value: number): GetBlockchainInfoResponse;

    getTxIndex(): boolean;
    setTxIndex(value: boolean): GetBlockchainInfoResponse;

    getAddrIndex(): boolean;
    setAddrIndex(value: boolean): GetBlockchainInfoResponse;

    getSlpIndex(): boolean;
    setSlpIndex(value: boolean): GetBlockchainInfoResponse;

    getSlpGraphsearch(): boolean;
    setSlpGraphsearch(value: boolean): GetBlockchainInfoResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockchainInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockchainInfoResponse): GetBlockchainInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockchainInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockchainInfoResponse;
    static deserializeBinaryFromReader(message: GetBlockchainInfoResponse, reader: jspb.BinaryReader): GetBlockchainInfoResponse;
}

export namespace GetBlockchainInfoResponse {
    export type AsObject = {
        bitcoinNet: GetBlockchainInfoResponse.BitcoinNet,
        bestHeight: number,
        bestBlockHash: Uint8Array | string,
        difficulty: number,
        medianTime: number,
        txIndex: boolean,
        addrIndex: boolean,
        slpIndex: boolean,
        slpGraphsearch: boolean,
    }

    export enum BitcoinNet {
    MAINNET = 0,
    REGTEST = 1,
    TESTNET3 = 2,
    SIMNET = 3,
    }

}

export class GetBlockInfoRequest extends jspb.Message { 

    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetBlockInfoRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetBlockInfoRequest;


    getHashOrHeightCase(): GetBlockInfoRequest.HashOrHeightCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockInfoRequest): GetBlockInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockInfoRequest;
    static deserializeBinaryFromReader(message: GetBlockInfoRequest, reader: jspb.BinaryReader): GetBlockInfoRequest;
}

export namespace GetBlockInfoRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        height: number,
    }

    export enum HashOrHeightCase {
        HASH_OR_HEIGHT_NOT_SET = 0,
    
    HASH = 1,

    HEIGHT = 2,

    }

}

export class GetBlockInfoResponse extends jspb.Message { 

    hasInfo(): boolean;
    clearInfo(): void;
    getInfo(): BlockInfo | undefined;
    setInfo(value?: BlockInfo): GetBlockInfoResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockInfoResponse): GetBlockInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockInfoResponse;
    static deserializeBinaryFromReader(message: GetBlockInfoResponse, reader: jspb.BinaryReader): GetBlockInfoResponse;
}

export namespace GetBlockInfoResponse {
    export type AsObject = {
        info?: BlockInfo.AsObject,
    }
}

export class GetBlockRequest extends jspb.Message { 

    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetBlockRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetBlockRequest;

    getFullTransactions(): boolean;
    setFullTransactions(value: boolean): GetBlockRequest;


    getHashOrHeightCase(): GetBlockRequest.HashOrHeightCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockRequest): GetBlockRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockRequest;
    static deserializeBinaryFromReader(message: GetBlockRequest, reader: jspb.BinaryReader): GetBlockRequest;
}

export namespace GetBlockRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        height: number,
        fullTransactions: boolean,
    }

    export enum HashOrHeightCase {
        HASH_OR_HEIGHT_NOT_SET = 0,
    
    HASH = 1,

    HEIGHT = 2,

    }

}

export class GetBlockResponse extends jspb.Message { 

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): Block | undefined;
    setBlock(value?: Block): GetBlockResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockResponse): GetBlockResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockResponse;
    static deserializeBinaryFromReader(message: GetBlockResponse, reader: jspb.BinaryReader): GetBlockResponse;
}

export namespace GetBlockResponse {
    export type AsObject = {
        block?: Block.AsObject,
    }
}

export class GetRawBlockRequest extends jspb.Message { 

    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetRawBlockRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetRawBlockRequest;


    getHashOrHeightCase(): GetRawBlockRequest.HashOrHeightCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawBlockRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawBlockRequest): GetRawBlockRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawBlockRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawBlockRequest;
    static deserializeBinaryFromReader(message: GetRawBlockRequest, reader: jspb.BinaryReader): GetRawBlockRequest;
}

export namespace GetRawBlockRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        height: number,
    }

    export enum HashOrHeightCase {
        HASH_OR_HEIGHT_NOT_SET = 0,
    
    HASH = 1,

    HEIGHT = 2,

    }

}

export class GetRawBlockResponse extends jspb.Message { 
    getBlock(): Uint8Array | string;
    getBlock_asU8(): Uint8Array;
    getBlock_asB64(): string;
    setBlock(value: Uint8Array | string): GetRawBlockResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawBlockResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawBlockResponse): GetRawBlockResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawBlockResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawBlockResponse;
    static deserializeBinaryFromReader(message: GetRawBlockResponse, reader: jspb.BinaryReader): GetRawBlockResponse;
}

export namespace GetRawBlockResponse {
    export type AsObject = {
        block: Uint8Array | string,
    }
}

export class GetBlockFilterRequest extends jspb.Message { 

    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetBlockFilterRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetBlockFilterRequest;


    getHashOrHeightCase(): GetBlockFilterRequest.HashOrHeightCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockFilterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockFilterRequest): GetBlockFilterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockFilterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockFilterRequest;
    static deserializeBinaryFromReader(message: GetBlockFilterRequest, reader: jspb.BinaryReader): GetBlockFilterRequest;
}

export namespace GetBlockFilterRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        height: number,
    }

    export enum HashOrHeightCase {
        HASH_OR_HEIGHT_NOT_SET = 0,
    
    HASH = 1,

    HEIGHT = 2,

    }

}

export class GetBlockFilterResponse extends jspb.Message { 
    getFilter(): Uint8Array | string;
    getFilter_asU8(): Uint8Array;
    getFilter_asB64(): string;
    setFilter(value: Uint8Array | string): GetBlockFilterResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlockFilterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlockFilterResponse): GetBlockFilterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlockFilterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlockFilterResponse;
    static deserializeBinaryFromReader(message: GetBlockFilterResponse, reader: jspb.BinaryReader): GetBlockFilterResponse;
}

export namespace GetBlockFilterResponse {
    export type AsObject = {
        filter: Uint8Array | string,
    }
}

export class GetHeadersRequest extends jspb.Message { 
    clearBlockLocatorHashesList(): void;
    getBlockLocatorHashesList(): Array<Uint8Array | string>;
    getBlockLocatorHashesList_asU8(): Array<Uint8Array>;
    getBlockLocatorHashesList_asB64(): Array<string>;
    setBlockLocatorHashesList(value: Array<Uint8Array | string>): GetHeadersRequest;
    addBlockLocatorHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

    getStopHash(): Uint8Array | string;
    getStopHash_asU8(): Uint8Array;
    getStopHash_asB64(): string;
    setStopHash(value: Uint8Array | string): GetHeadersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHeadersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetHeadersRequest): GetHeadersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHeadersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHeadersRequest;
    static deserializeBinaryFromReader(message: GetHeadersRequest, reader: jspb.BinaryReader): GetHeadersRequest;
}

export namespace GetHeadersRequest {
    export type AsObject = {
        blockLocatorHashesList: Array<Uint8Array | string>,
        stopHash: Uint8Array | string,
    }
}

export class GetHeadersResponse extends jspb.Message { 
    clearHeadersList(): void;
    getHeadersList(): Array<BlockInfo>;
    setHeadersList(value: Array<BlockInfo>): GetHeadersResponse;
    addHeaders(value?: BlockInfo, index?: number): BlockInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHeadersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetHeadersResponse): GetHeadersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHeadersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHeadersResponse;
    static deserializeBinaryFromReader(message: GetHeadersResponse, reader: jspb.BinaryReader): GetHeadersResponse;
}

export namespace GetHeadersResponse {
    export type AsObject = {
        headersList: Array<BlockInfo.AsObject>,
    }
}

export class GetTransactionRequest extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetTransactionRequest;

    getIncludeTokenMetadata(): boolean;
    setIncludeTokenMetadata(value: boolean): GetTransactionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
    static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        includeTokenMetadata: boolean,
    }
}

export class GetTransactionResponse extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): Transaction | undefined;
    setTransaction(value?: Transaction): GetTransactionResponse;


    hasTokenMetadata(): boolean;
    clearTokenMetadata(): void;
    getTokenMetadata(): TokenMetadata | undefined;
    setTokenMetadata(value?: TokenMetadata): GetTransactionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionResponse;
    static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse;
}

export namespace GetTransactionResponse {
    export type AsObject = {
        transaction?: Transaction.AsObject,
        tokenMetadata?: TokenMetadata.AsObject,
    }
}

export class GetRawTransactionRequest extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetRawTransactionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawTransactionRequest): GetRawTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawTransactionRequest;
    static deserializeBinaryFromReader(message: GetRawTransactionRequest, reader: jspb.BinaryReader): GetRawTransactionRequest;
}

export namespace GetRawTransactionRequest {
    export type AsObject = {
        hash: Uint8Array | string,
    }
}

export class GetRawTransactionResponse extends jspb.Message { 
    getTransaction(): Uint8Array | string;
    getTransaction_asU8(): Uint8Array;
    getTransaction_asB64(): string;
    setTransaction(value: Uint8Array | string): GetRawTransactionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawTransactionResponse): GetRawTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawTransactionResponse;
    static deserializeBinaryFromReader(message: GetRawTransactionResponse, reader: jspb.BinaryReader): GetRawTransactionResponse;
}

export namespace GetRawTransactionResponse {
    export type AsObject = {
        transaction: Uint8Array | string,
    }
}

export class GetAddressTransactionsRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetAddressTransactionsRequest;

    getNbSkip(): number;
    setNbSkip(value: number): GetAddressTransactionsRequest;

    getNbFetch(): number;
    setNbFetch(value: number): GetAddressTransactionsRequest;


    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetAddressTransactionsRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetAddressTransactionsRequest;


    getStartBlockCase(): GetAddressTransactionsRequest.StartBlockCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAddressTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAddressTransactionsRequest): GetAddressTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAddressTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAddressTransactionsRequest;
    static deserializeBinaryFromReader(message: GetAddressTransactionsRequest, reader: jspb.BinaryReader): GetAddressTransactionsRequest;
}

export namespace GetAddressTransactionsRequest {
    export type AsObject = {
        address: string,
        nbSkip: number,
        nbFetch: number,
        hash: Uint8Array | string,
        height: number,
    }

    export enum StartBlockCase {
        START_BLOCK_NOT_SET = 0,
    
    HASH = 4,

    HEIGHT = 5,

    }

}

export class GetAddressTransactionsResponse extends jspb.Message { 
    clearConfirmedTransactionsList(): void;
    getConfirmedTransactionsList(): Array<Transaction>;
    setConfirmedTransactionsList(value: Array<Transaction>): GetAddressTransactionsResponse;
    addConfirmedTransactions(value?: Transaction, index?: number): Transaction;

    clearUnconfirmedTransactionsList(): void;
    getUnconfirmedTransactionsList(): Array<MempoolTransaction>;
    setUnconfirmedTransactionsList(value: Array<MempoolTransaction>): GetAddressTransactionsResponse;
    addUnconfirmedTransactions(value?: MempoolTransaction, index?: number): MempoolTransaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAddressTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAddressTransactionsResponse): GetAddressTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAddressTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAddressTransactionsResponse;
    static deserializeBinaryFromReader(message: GetAddressTransactionsResponse, reader: jspb.BinaryReader): GetAddressTransactionsResponse;
}

export namespace GetAddressTransactionsResponse {
    export type AsObject = {
        confirmedTransactionsList: Array<Transaction.AsObject>,
        unconfirmedTransactionsList: Array<MempoolTransaction.AsObject>,
    }
}

export class GetRawAddressTransactionsRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetRawAddressTransactionsRequest;

    getNbSkip(): number;
    setNbSkip(value: number): GetRawAddressTransactionsRequest;

    getNbFetch(): number;
    setNbFetch(value: number): GetRawAddressTransactionsRequest;


    hasHash(): boolean;
    clearHash(): void;
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetRawAddressTransactionsRequest;


    hasHeight(): boolean;
    clearHeight(): void;
    getHeight(): number;
    setHeight(value: number): GetRawAddressTransactionsRequest;


    getStartBlockCase(): GetRawAddressTransactionsRequest.StartBlockCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawAddressTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawAddressTransactionsRequest): GetRawAddressTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawAddressTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawAddressTransactionsRequest;
    static deserializeBinaryFromReader(message: GetRawAddressTransactionsRequest, reader: jspb.BinaryReader): GetRawAddressTransactionsRequest;
}

export namespace GetRawAddressTransactionsRequest {
    export type AsObject = {
        address: string,
        nbSkip: number,
        nbFetch: number,
        hash: Uint8Array | string,
        height: number,
    }

    export enum StartBlockCase {
        START_BLOCK_NOT_SET = 0,
    
    HASH = 4,

    HEIGHT = 5,

    }

}

export class GetRawAddressTransactionsResponse extends jspb.Message { 
    clearConfirmedTransactionsList(): void;
    getConfirmedTransactionsList(): Array<Uint8Array | string>;
    getConfirmedTransactionsList_asU8(): Array<Uint8Array>;
    getConfirmedTransactionsList_asB64(): Array<string>;
    setConfirmedTransactionsList(value: Array<Uint8Array | string>): GetRawAddressTransactionsResponse;
    addConfirmedTransactions(value: Uint8Array | string, index?: number): Uint8Array | string;

    clearUnconfirmedTransactionsList(): void;
    getUnconfirmedTransactionsList(): Array<Uint8Array | string>;
    getUnconfirmedTransactionsList_asU8(): Array<Uint8Array>;
    getUnconfirmedTransactionsList_asB64(): Array<string>;
    setUnconfirmedTransactionsList(value: Array<Uint8Array | string>): GetRawAddressTransactionsResponse;
    addUnconfirmedTransactions(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRawAddressTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRawAddressTransactionsResponse): GetRawAddressTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRawAddressTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRawAddressTransactionsResponse;
    static deserializeBinaryFromReader(message: GetRawAddressTransactionsResponse, reader: jspb.BinaryReader): GetRawAddressTransactionsResponse;
}

export namespace GetRawAddressTransactionsResponse {
    export type AsObject = {
        confirmedTransactionsList: Array<Uint8Array | string>,
        unconfirmedTransactionsList: Array<Uint8Array | string>,
    }
}

export class GetAddressUnspentOutputsRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetAddressUnspentOutputsRequest;

    getIncludeMempool(): boolean;
    setIncludeMempool(value: boolean): GetAddressUnspentOutputsRequest;

    getIncludeTokenMetadata(): boolean;
    setIncludeTokenMetadata(value: boolean): GetAddressUnspentOutputsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAddressUnspentOutputsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAddressUnspentOutputsRequest): GetAddressUnspentOutputsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAddressUnspentOutputsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAddressUnspentOutputsRequest;
    static deserializeBinaryFromReader(message: GetAddressUnspentOutputsRequest, reader: jspb.BinaryReader): GetAddressUnspentOutputsRequest;
}

export namespace GetAddressUnspentOutputsRequest {
    export type AsObject = {
        address: string,
        includeMempool: boolean,
        includeTokenMetadata: boolean,
    }
}

export class GetAddressUnspentOutputsResponse extends jspb.Message { 
    clearOutputsList(): void;
    getOutputsList(): Array<UnspentOutput>;
    setOutputsList(value: Array<UnspentOutput>): GetAddressUnspentOutputsResponse;
    addOutputs(value?: UnspentOutput, index?: number): UnspentOutput;

    clearTokenMetadataList(): void;
    getTokenMetadataList(): Array<TokenMetadata>;
    setTokenMetadataList(value: Array<TokenMetadata>): GetAddressUnspentOutputsResponse;
    addTokenMetadata(value?: TokenMetadata, index?: number): TokenMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAddressUnspentOutputsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAddressUnspentOutputsResponse): GetAddressUnspentOutputsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAddressUnspentOutputsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAddressUnspentOutputsResponse;
    static deserializeBinaryFromReader(message: GetAddressUnspentOutputsResponse, reader: jspb.BinaryReader): GetAddressUnspentOutputsResponse;
}

export namespace GetAddressUnspentOutputsResponse {
    export type AsObject = {
        outputsList: Array<UnspentOutput.AsObject>,
        tokenMetadataList: Array<TokenMetadata.AsObject>,
    }
}

export class GetUnspentOutputRequest extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetUnspentOutputRequest;

    getIndex(): number;
    setIndex(value: number): GetUnspentOutputRequest;

    getIncludeMempool(): boolean;
    setIncludeMempool(value: boolean): GetUnspentOutputRequest;

    getIncludeTokenMetadata(): boolean;
    setIncludeTokenMetadata(value: boolean): GetUnspentOutputRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUnspentOutputRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUnspentOutputRequest): GetUnspentOutputRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUnspentOutputRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUnspentOutputRequest;
    static deserializeBinaryFromReader(message: GetUnspentOutputRequest, reader: jspb.BinaryReader): GetUnspentOutputRequest;
}

export namespace GetUnspentOutputRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        index: number,
        includeMempool: boolean,
        includeTokenMetadata: boolean,
    }
}

export class GetUnspentOutputResponse extends jspb.Message { 

    hasOutpoint(): boolean;
    clearOutpoint(): void;
    getOutpoint(): Transaction.Input.Outpoint | undefined;
    setOutpoint(value?: Transaction.Input.Outpoint): GetUnspentOutputResponse;

    getPubkeyScript(): Uint8Array | string;
    getPubkeyScript_asU8(): Uint8Array;
    getPubkeyScript_asB64(): string;
    setPubkeyScript(value: Uint8Array | string): GetUnspentOutputResponse;

    getValue(): number;
    setValue(value: number): GetUnspentOutputResponse;

    getIsCoinbase(): boolean;
    setIsCoinbase(value: boolean): GetUnspentOutputResponse;

    getBlockHeight(): number;
    setBlockHeight(value: number): GetUnspentOutputResponse;


    hasSlpToken(): boolean;
    clearSlpToken(): void;
    getSlpToken(): SlpToken | undefined;
    setSlpToken(value?: SlpToken): GetUnspentOutputResponse;


    hasTokenMetadata(): boolean;
    clearTokenMetadata(): void;
    getTokenMetadata(): TokenMetadata | undefined;
    setTokenMetadata(value?: TokenMetadata): GetUnspentOutputResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUnspentOutputResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUnspentOutputResponse): GetUnspentOutputResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUnspentOutputResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUnspentOutputResponse;
    static deserializeBinaryFromReader(message: GetUnspentOutputResponse, reader: jspb.BinaryReader): GetUnspentOutputResponse;
}

export namespace GetUnspentOutputResponse {
    export type AsObject = {
        outpoint?: Transaction.Input.Outpoint.AsObject,
        pubkeyScript: Uint8Array | string,
        value: number,
        isCoinbase: boolean,
        blockHeight: number,
        slpToken?: SlpToken.AsObject,
        tokenMetadata?: TokenMetadata.AsObject,
    }
}

export class GetMerkleProofRequest extends jspb.Message { 
    getTransactionHash(): Uint8Array | string;
    getTransactionHash_asU8(): Uint8Array;
    getTransactionHash_asB64(): string;
    setTransactionHash(value: Uint8Array | string): GetMerkleProofRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMerkleProofRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMerkleProofRequest): GetMerkleProofRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMerkleProofRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMerkleProofRequest;
    static deserializeBinaryFromReader(message: GetMerkleProofRequest, reader: jspb.BinaryReader): GetMerkleProofRequest;
}

export namespace GetMerkleProofRequest {
    export type AsObject = {
        transactionHash: Uint8Array | string,
    }
}

export class GetMerkleProofResponse extends jspb.Message { 

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): BlockInfo | undefined;
    setBlock(value?: BlockInfo): GetMerkleProofResponse;

    clearHashesList(): void;
    getHashesList(): Array<Uint8Array | string>;
    getHashesList_asU8(): Array<Uint8Array>;
    getHashesList_asB64(): Array<string>;
    setHashesList(value: Array<Uint8Array | string>): GetMerkleProofResponse;
    addHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

    getFlags(): Uint8Array | string;
    getFlags_asU8(): Uint8Array;
    getFlags_asB64(): string;
    setFlags(value: Uint8Array | string): GetMerkleProofResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMerkleProofResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMerkleProofResponse): GetMerkleProofResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMerkleProofResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMerkleProofResponse;
    static deserializeBinaryFromReader(message: GetMerkleProofResponse, reader: jspb.BinaryReader): GetMerkleProofResponse;
}

export namespace GetMerkleProofResponse {
    export type AsObject = {
        block?: BlockInfo.AsObject,
        hashesList: Array<Uint8Array | string>,
        flags: Uint8Array | string,
    }
}

export class SubmitTransactionRequest extends jspb.Message { 
    getTransaction(): Uint8Array | string;
    getTransaction_asU8(): Uint8Array;
    getTransaction_asB64(): string;
    setTransaction(value: Uint8Array | string): SubmitTransactionRequest;

    getSkipSlpValidityCheck(): boolean;
    setSkipSlpValidityCheck(value: boolean): SubmitTransactionRequest;

    clearRequiredSlpBurnsList(): void;
    getRequiredSlpBurnsList(): Array<SlpRequiredBurn>;
    setRequiredSlpBurnsList(value: Array<SlpRequiredBurn>): SubmitTransactionRequest;
    addRequiredSlpBurns(value?: SlpRequiredBurn, index?: number): SlpRequiredBurn;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitTransactionRequest): SubmitTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitTransactionRequest;
    static deserializeBinaryFromReader(message: SubmitTransactionRequest, reader: jspb.BinaryReader): SubmitTransactionRequest;
}

export namespace SubmitTransactionRequest {
    export type AsObject = {
        transaction: Uint8Array | string,
        skipSlpValidityCheck: boolean,
        requiredSlpBurnsList: Array<SlpRequiredBurn.AsObject>,
    }
}

export class SubmitTransactionResponse extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): SubmitTransactionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitTransactionResponse): SubmitTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitTransactionResponse;
    static deserializeBinaryFromReader(message: SubmitTransactionResponse, reader: jspb.BinaryReader): SubmitTransactionResponse;
}

export namespace SubmitTransactionResponse {
    export type AsObject = {
        hash: Uint8Array | string,
    }
}

export class CheckSlpTransactionRequest extends jspb.Message { 
    getTransaction(): Uint8Array | string;
    getTransaction_asU8(): Uint8Array;
    getTransaction_asB64(): string;
    setTransaction(value: Uint8Array | string): CheckSlpTransactionRequest;

    clearRequiredSlpBurnsList(): void;
    getRequiredSlpBurnsList(): Array<SlpRequiredBurn>;
    setRequiredSlpBurnsList(value: Array<SlpRequiredBurn>): CheckSlpTransactionRequest;
    addRequiredSlpBurns(value?: SlpRequiredBurn, index?: number): SlpRequiredBurn;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckSlpTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CheckSlpTransactionRequest): CheckSlpTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckSlpTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckSlpTransactionRequest;
    static deserializeBinaryFromReader(message: CheckSlpTransactionRequest, reader: jspb.BinaryReader): CheckSlpTransactionRequest;
}

export namespace CheckSlpTransactionRequest {
    export type AsObject = {
        transaction: Uint8Array | string,
        requiredSlpBurnsList: Array<SlpRequiredBurn.AsObject>,
    }
}

export class CheckSlpTransactionResponse extends jspb.Message { 
    getIsValid(): boolean;
    setIsValid(value: boolean): CheckSlpTransactionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckSlpTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CheckSlpTransactionResponse): CheckSlpTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckSlpTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckSlpTransactionResponse;
    static deserializeBinaryFromReader(message: CheckSlpTransactionResponse, reader: jspb.BinaryReader): CheckSlpTransactionResponse;
}

export namespace CheckSlpTransactionResponse {
    export type AsObject = {
        isValid: boolean,
    }
}

export class SubscribeTransactionsRequest extends jspb.Message { 

    hasSubscribe(): boolean;
    clearSubscribe(): void;
    getSubscribe(): TransactionFilter | undefined;
    setSubscribe(value?: TransactionFilter): SubscribeTransactionsRequest;


    hasUnsubscribe(): boolean;
    clearUnsubscribe(): void;
    getUnsubscribe(): TransactionFilter | undefined;
    setUnsubscribe(value?: TransactionFilter): SubscribeTransactionsRequest;

    getIncludeMempool(): boolean;
    setIncludeMempool(value: boolean): SubscribeTransactionsRequest;

    getIncludeInBlock(): boolean;
    setIncludeInBlock(value: boolean): SubscribeTransactionsRequest;

    getSerializeTx(): boolean;
    setSerializeTx(value: boolean): SubscribeTransactionsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeTransactionsRequest): SubscribeTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeTransactionsRequest;
    static deserializeBinaryFromReader(message: SubscribeTransactionsRequest, reader: jspb.BinaryReader): SubscribeTransactionsRequest;
}

export namespace SubscribeTransactionsRequest {
    export type AsObject = {
        subscribe?: TransactionFilter.AsObject,
        unsubscribe?: TransactionFilter.AsObject,
        includeMempool: boolean,
        includeInBlock: boolean,
        serializeTx: boolean,
    }
}

export class SubscribeBlocksRequest extends jspb.Message { 
    getFullBlock(): boolean;
    setFullBlock(value: boolean): SubscribeBlocksRequest;

    getFullTransactions(): boolean;
    setFullTransactions(value: boolean): SubscribeBlocksRequest;

    getSerializeBlock(): boolean;
    setSerializeBlock(value: boolean): SubscribeBlocksRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeBlocksRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeBlocksRequest): SubscribeBlocksRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeBlocksRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeBlocksRequest;
    static deserializeBinaryFromReader(message: SubscribeBlocksRequest, reader: jspb.BinaryReader): SubscribeBlocksRequest;
}

export namespace SubscribeBlocksRequest {
    export type AsObject = {
        fullBlock: boolean,
        fullTransactions: boolean,
        serializeBlock: boolean,
    }
}

export class GetTokenMetadataRequest extends jspb.Message { 
    clearTokenIdsList(): void;
    getTokenIdsList(): Array<Uint8Array | string>;
    getTokenIdsList_asU8(): Array<Uint8Array>;
    getTokenIdsList_asB64(): Array<string>;
    setTokenIdsList(value: Array<Uint8Array | string>): GetTokenMetadataRequest;
    addTokenIds(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTokenMetadataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTokenMetadataRequest): GetTokenMetadataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTokenMetadataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTokenMetadataRequest;
    static deserializeBinaryFromReader(message: GetTokenMetadataRequest, reader: jspb.BinaryReader): GetTokenMetadataRequest;
}

export namespace GetTokenMetadataRequest {
    export type AsObject = {
        tokenIdsList: Array<Uint8Array | string>,
    }
}

export class GetTokenMetadataResponse extends jspb.Message { 
    clearTokenMetadataList(): void;
    getTokenMetadataList(): Array<TokenMetadata>;
    setTokenMetadataList(value: Array<TokenMetadata>): GetTokenMetadataResponse;
    addTokenMetadata(value?: TokenMetadata, index?: number): TokenMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTokenMetadataResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTokenMetadataResponse): GetTokenMetadataResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTokenMetadataResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTokenMetadataResponse;
    static deserializeBinaryFromReader(message: GetTokenMetadataResponse, reader: jspb.BinaryReader): GetTokenMetadataResponse;
}

export namespace GetTokenMetadataResponse {
    export type AsObject = {
        tokenMetadataList: Array<TokenMetadata.AsObject>,
    }
}

export class GetParsedSlpScriptRequest extends jspb.Message { 
    getSlpOpreturnScript(): Uint8Array | string;
    getSlpOpreturnScript_asU8(): Uint8Array;
    getSlpOpreturnScript_asB64(): string;
    setSlpOpreturnScript(value: Uint8Array | string): GetParsedSlpScriptRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetParsedSlpScriptRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetParsedSlpScriptRequest): GetParsedSlpScriptRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetParsedSlpScriptRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetParsedSlpScriptRequest;
    static deserializeBinaryFromReader(message: GetParsedSlpScriptRequest, reader: jspb.BinaryReader): GetParsedSlpScriptRequest;
}

export namespace GetParsedSlpScriptRequest {
    export type AsObject = {
        slpOpreturnScript: Uint8Array | string,
    }
}

export class GetParsedSlpScriptResponse extends jspb.Message { 
    getParsingError(): string;
    setParsingError(value: string): GetParsedSlpScriptResponse;

    getTokenId(): Uint8Array | string;
    getTokenId_asU8(): Uint8Array;
    getTokenId_asB64(): string;
    setTokenId(value: Uint8Array | string): GetParsedSlpScriptResponse;

    getSlpAction(): SlpAction;
    setSlpAction(value: SlpAction): GetParsedSlpScriptResponse;

    getTokenType(): number;
    setTokenType(value: number): GetParsedSlpScriptResponse;


    hasV1Genesis(): boolean;
    clearV1Genesis(): void;
    getV1Genesis(): SlpV1GenesisMetadata | undefined;
    setV1Genesis(value?: SlpV1GenesisMetadata): GetParsedSlpScriptResponse;


    hasV1Mint(): boolean;
    clearV1Mint(): void;
    getV1Mint(): SlpV1MintMetadata | undefined;
    setV1Mint(value?: SlpV1MintMetadata): GetParsedSlpScriptResponse;


    hasV1Send(): boolean;
    clearV1Send(): void;
    getV1Send(): SlpV1SendMetadata | undefined;
    setV1Send(value?: SlpV1SendMetadata): GetParsedSlpScriptResponse;


    hasNft1ChildGenesis(): boolean;
    clearNft1ChildGenesis(): void;
    getNft1ChildGenesis(): SlpNft1ChildGenesisMetadata | undefined;
    setNft1ChildGenesis(value?: SlpNft1ChildGenesisMetadata): GetParsedSlpScriptResponse;


    hasNft1ChildSend(): boolean;
    clearNft1ChildSend(): void;
    getNft1ChildSend(): SlpNft1ChildSendMetadata | undefined;
    setNft1ChildSend(value?: SlpNft1ChildSendMetadata): GetParsedSlpScriptResponse;


    getSlpMetadataCase(): GetParsedSlpScriptResponse.SlpMetadataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetParsedSlpScriptResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetParsedSlpScriptResponse): GetParsedSlpScriptResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetParsedSlpScriptResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetParsedSlpScriptResponse;
    static deserializeBinaryFromReader(message: GetParsedSlpScriptResponse, reader: jspb.BinaryReader): GetParsedSlpScriptResponse;
}

export namespace GetParsedSlpScriptResponse {
    export type AsObject = {
        parsingError: string,
        tokenId: Uint8Array | string,
        slpAction: SlpAction,
        tokenType: number,
        v1Genesis?: SlpV1GenesisMetadata.AsObject,
        v1Mint?: SlpV1MintMetadata.AsObject,
        v1Send?: SlpV1SendMetadata.AsObject,
        nft1ChildGenesis?: SlpNft1ChildGenesisMetadata.AsObject,
        nft1ChildSend?: SlpNft1ChildSendMetadata.AsObject,
    }

    export enum SlpMetadataCase {
        SLP_METADATA_NOT_SET = 0,
    
    V1_GENESIS = 5,

    V1_MINT = 6,

    V1_SEND = 7,

    NFT1_CHILD_GENESIS = 8,

    NFT1_CHILD_SEND = 9,

    }

}

export class GetTrustedSlpValidationRequest extends jspb.Message { 
    clearQueriesList(): void;
    getQueriesList(): Array<GetTrustedSlpValidationRequest.Query>;
    setQueriesList(value: Array<GetTrustedSlpValidationRequest.Query>): GetTrustedSlpValidationRequest;
    addQueries(value?: GetTrustedSlpValidationRequest.Query, index?: number): GetTrustedSlpValidationRequest.Query;

    getIncludeGraphsearchCount(): boolean;
    setIncludeGraphsearchCount(value: boolean): GetTrustedSlpValidationRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTrustedSlpValidationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTrustedSlpValidationRequest): GetTrustedSlpValidationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTrustedSlpValidationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTrustedSlpValidationRequest;
    static deserializeBinaryFromReader(message: GetTrustedSlpValidationRequest, reader: jspb.BinaryReader): GetTrustedSlpValidationRequest;
}

export namespace GetTrustedSlpValidationRequest {
    export type AsObject = {
        queriesList: Array<GetTrustedSlpValidationRequest.Query.AsObject>,
        includeGraphsearchCount: boolean,
    }


    export class Query extends jspb.Message { 
        getPrevOutHash(): Uint8Array | string;
        getPrevOutHash_asU8(): Uint8Array;
        getPrevOutHash_asB64(): string;
        setPrevOutHash(value: Uint8Array | string): Query;

        getPrevOutVout(): number;
        setPrevOutVout(value: number): Query;

        clearGraphsearchValidTxidsList(): void;
        getGraphsearchValidTxidsList(): Array<Uint8Array | string>;
        getGraphsearchValidTxidsList_asU8(): Array<Uint8Array>;
        getGraphsearchValidTxidsList_asB64(): Array<string>;
        setGraphsearchValidTxidsList(value: Array<Uint8Array | string>): Query;
        addGraphsearchValidTxids(value: Uint8Array | string, index?: number): Uint8Array | string;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Query.AsObject;
        static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Query;
        static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
    }

    export namespace Query {
        export type AsObject = {
            prevOutHash: Uint8Array | string,
            prevOutVout: number,
            graphsearchValidTxidsList: Array<Uint8Array | string>,
        }
    }

}

export class GetTrustedSlpValidationResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<GetTrustedSlpValidationResponse.ValidityResult>;
    setResultsList(value: Array<GetTrustedSlpValidationResponse.ValidityResult>): GetTrustedSlpValidationResponse;
    addResults(value?: GetTrustedSlpValidationResponse.ValidityResult, index?: number): GetTrustedSlpValidationResponse.ValidityResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTrustedSlpValidationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTrustedSlpValidationResponse): GetTrustedSlpValidationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTrustedSlpValidationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTrustedSlpValidationResponse;
    static deserializeBinaryFromReader(message: GetTrustedSlpValidationResponse, reader: jspb.BinaryReader): GetTrustedSlpValidationResponse;
}

export namespace GetTrustedSlpValidationResponse {
    export type AsObject = {
        resultsList: Array<GetTrustedSlpValidationResponse.ValidityResult.AsObject>,
    }


    export class ValidityResult extends jspb.Message { 
        getPrevOutHash(): Uint8Array | string;
        getPrevOutHash_asU8(): Uint8Array;
        getPrevOutHash_asB64(): string;
        setPrevOutHash(value: Uint8Array | string): ValidityResult;

        getPrevOutVout(): number;
        setPrevOutVout(value: number): ValidityResult;

        getTokenId(): Uint8Array | string;
        getTokenId_asU8(): Uint8Array;
        getTokenId_asB64(): string;
        setTokenId(value: Uint8Array | string): ValidityResult;

        getSlpAction(): SlpAction;
        setSlpAction(value: SlpAction): ValidityResult;

        getTokenType(): number;
        setTokenType(value: number): ValidityResult;


        hasV1TokenAmount(): boolean;
        clearV1TokenAmount(): void;
        getV1TokenAmount(): string;
        setV1TokenAmount(value: string): ValidityResult;


        hasV1MintBaton(): boolean;
        clearV1MintBaton(): void;
        getV1MintBaton(): boolean;
        setV1MintBaton(value: boolean): ValidityResult;

        getSlpTxnOpreturn(): Uint8Array | string;
        getSlpTxnOpreturn_asU8(): Uint8Array;
        getSlpTxnOpreturn_asB64(): string;
        setSlpTxnOpreturn(value: Uint8Array | string): ValidityResult;

        getGraphsearchTxnCount(): number;
        setGraphsearchTxnCount(value: number): ValidityResult;


        getValidityResultTypeCase(): ValidityResult.ValidityResultTypeCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ValidityResult.AsObject;
        static toObject(includeInstance: boolean, msg: ValidityResult): ValidityResult.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ValidityResult, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ValidityResult;
        static deserializeBinaryFromReader(message: ValidityResult, reader: jspb.BinaryReader): ValidityResult;
    }

    export namespace ValidityResult {
        export type AsObject = {
            prevOutHash: Uint8Array | string,
            prevOutVout: number,
            tokenId: Uint8Array | string,
            slpAction: SlpAction,
            tokenType: number,
            v1TokenAmount: string,
            v1MintBaton: boolean,
            slpTxnOpreturn: Uint8Array | string,
            graphsearchTxnCount: number,
        }

        export enum ValidityResultTypeCase {
            VALIDITY_RESULT_TYPE_NOT_SET = 0,
        
    V1_TOKEN_AMOUNT = 6,

    V1_MINT_BATON = 7,

        }

    }

}

export class GetSlpGraphSearchRequest extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): GetSlpGraphSearchRequest;

    clearValidTxidsList(): void;
    getValidTxidsList(): Array<Uint8Array | string>;
    getValidTxidsList_asU8(): Array<Uint8Array>;
    getValidTxidsList_asB64(): Array<string>;
    setValidTxidsList(value: Array<Uint8Array | string>): GetSlpGraphSearchRequest;
    addValidTxids(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSlpGraphSearchRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSlpGraphSearchRequest): GetSlpGraphSearchRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSlpGraphSearchRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSlpGraphSearchRequest;
    static deserializeBinaryFromReader(message: GetSlpGraphSearchRequest, reader: jspb.BinaryReader): GetSlpGraphSearchRequest;
}

export namespace GetSlpGraphSearchRequest {
    export type AsObject = {
        hash: Uint8Array | string,
        validTxidsList: Array<Uint8Array | string>,
    }
}

export class GetSlpGraphSearchResponse extends jspb.Message { 
    clearTxdataList(): void;
    getTxdataList(): Array<Uint8Array | string>;
    getTxdataList_asU8(): Array<Uint8Array>;
    getTxdataList_asB64(): Array<string>;
    setTxdataList(value: Array<Uint8Array | string>): GetSlpGraphSearchResponse;
    addTxdata(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSlpGraphSearchResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSlpGraphSearchResponse): GetSlpGraphSearchResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSlpGraphSearchResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSlpGraphSearchResponse;
    static deserializeBinaryFromReader(message: GetSlpGraphSearchResponse, reader: jspb.BinaryReader): GetSlpGraphSearchResponse;
}

export namespace GetSlpGraphSearchResponse {
    export type AsObject = {
        txdataList: Array<Uint8Array | string>,
    }
}

export class GetBip44HdAddressRequest extends jspb.Message { 
    getXpub(): string;
    setXpub(value: string): GetBip44HdAddressRequest;

    getChange(): boolean;
    setChange(value: boolean): GetBip44HdAddressRequest;

    getAddressIndex(): number;
    setAddressIndex(value: number): GetBip44HdAddressRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBip44HdAddressRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBip44HdAddressRequest): GetBip44HdAddressRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBip44HdAddressRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBip44HdAddressRequest;
    static deserializeBinaryFromReader(message: GetBip44HdAddressRequest, reader: jspb.BinaryReader): GetBip44HdAddressRequest;
}

export namespace GetBip44HdAddressRequest {
    export type AsObject = {
        xpub: string,
        change: boolean,
        addressIndex: number,
    }
}

export class GetBip44HdAddressResponse extends jspb.Message { 
    getPubKey(): Uint8Array | string;
    getPubKey_asU8(): Uint8Array;
    getPubKey_asB64(): string;
    setPubKey(value: Uint8Array | string): GetBip44HdAddressResponse;

    getCashAddr(): string;
    setCashAddr(value: string): GetBip44HdAddressResponse;

    getSlpAddr(): string;
    setSlpAddr(value: string): GetBip44HdAddressResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBip44HdAddressResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBip44HdAddressResponse): GetBip44HdAddressResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBip44HdAddressResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBip44HdAddressResponse;
    static deserializeBinaryFromReader(message: GetBip44HdAddressResponse, reader: jspb.BinaryReader): GetBip44HdAddressResponse;
}

export namespace GetBip44HdAddressResponse {
    export type AsObject = {
        pubKey: Uint8Array | string,
        cashAddr: string,
        slpAddr: string,
    }
}

export class BlockNotification extends jspb.Message { 
    getType(): BlockNotification.Type;
    setType(value: BlockNotification.Type): BlockNotification;


    hasBlockInfo(): boolean;
    clearBlockInfo(): void;
    getBlockInfo(): BlockInfo | undefined;
    setBlockInfo(value?: BlockInfo): BlockNotification;


    hasMarshaledBlock(): boolean;
    clearMarshaledBlock(): void;
    getMarshaledBlock(): Block | undefined;
    setMarshaledBlock(value?: Block): BlockNotification;


    hasSerializedBlock(): boolean;
    clearSerializedBlock(): void;
    getSerializedBlock(): Uint8Array | string;
    getSerializedBlock_asU8(): Uint8Array;
    getSerializedBlock_asB64(): string;
    setSerializedBlock(value: Uint8Array | string): BlockNotification;


    getBlockCase(): BlockNotification.BlockCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockNotification.AsObject;
    static toObject(includeInstance: boolean, msg: BlockNotification): BlockNotification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BlockNotification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockNotification;
    static deserializeBinaryFromReader(message: BlockNotification, reader: jspb.BinaryReader): BlockNotification;
}

export namespace BlockNotification {
    export type AsObject = {
        type: BlockNotification.Type,
        blockInfo?: BlockInfo.AsObject,
        marshaledBlock?: Block.AsObject,
        serializedBlock: Uint8Array | string,
    }

    export enum Type {
    CONNECTED = 0,
    DISCONNECTED = 1,
    }


    export enum BlockCase {
        BLOCK_NOT_SET = 0,
    
    BLOCK_INFO = 2,

    MARSHALED_BLOCK = 3,

    SERIALIZED_BLOCK = 4,

    }

}

export class TransactionNotification extends jspb.Message { 
    getType(): TransactionNotification.Type;
    setType(value: TransactionNotification.Type): TransactionNotification;


    hasConfirmedTransaction(): boolean;
    clearConfirmedTransaction(): void;
    getConfirmedTransaction(): Transaction | undefined;
    setConfirmedTransaction(value?: Transaction): TransactionNotification;


    hasUnconfirmedTransaction(): boolean;
    clearUnconfirmedTransaction(): void;
    getUnconfirmedTransaction(): MempoolTransaction | undefined;
    setUnconfirmedTransaction(value?: MempoolTransaction): TransactionNotification;


    hasSerializedTransaction(): boolean;
    clearSerializedTransaction(): void;
    getSerializedTransaction(): Uint8Array | string;
    getSerializedTransaction_asU8(): Uint8Array;
    getSerializedTransaction_asB64(): string;
    setSerializedTransaction(value: Uint8Array | string): TransactionNotification;


    getTransactionCase(): TransactionNotification.TransactionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionNotification.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionNotification): TransactionNotification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionNotification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionNotification;
    static deserializeBinaryFromReader(message: TransactionNotification, reader: jspb.BinaryReader): TransactionNotification;
}

export namespace TransactionNotification {
    export type AsObject = {
        type: TransactionNotification.Type,
        confirmedTransaction?: Transaction.AsObject,
        unconfirmedTransaction?: MempoolTransaction.AsObject,
        serializedTransaction: Uint8Array | string,
    }

    export enum Type {
    UNCONFIRMED = 0,
    CONFIRMED = 1,
    }


    export enum TransactionCase {
        TRANSACTION_NOT_SET = 0,
    
    CONFIRMED_TRANSACTION = 2,

    UNCONFIRMED_TRANSACTION = 3,

    SERIALIZED_TRANSACTION = 4,

    }

}

export class BlockInfo extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): BlockInfo;

    getHeight(): number;
    setHeight(value: number): BlockInfo;

    getVersion(): number;
    setVersion(value: number): BlockInfo;

    getPreviousBlock(): Uint8Array | string;
    getPreviousBlock_asU8(): Uint8Array;
    getPreviousBlock_asB64(): string;
    setPreviousBlock(value: Uint8Array | string): BlockInfo;

    getMerkleRoot(): Uint8Array | string;
    getMerkleRoot_asU8(): Uint8Array;
    getMerkleRoot_asB64(): string;
    setMerkleRoot(value: Uint8Array | string): BlockInfo;

    getTimestamp(): number;
    setTimestamp(value: number): BlockInfo;

    getBits(): number;
    setBits(value: number): BlockInfo;

    getNonce(): number;
    setNonce(value: number): BlockInfo;

    getConfirmations(): number;
    setConfirmations(value: number): BlockInfo;

    getDifficulty(): number;
    setDifficulty(value: number): BlockInfo;

    getNextBlockHash(): Uint8Array | string;
    getNextBlockHash_asU8(): Uint8Array;
    getNextBlockHash_asB64(): string;
    setNextBlockHash(value: Uint8Array | string): BlockInfo;

    getSize(): number;
    setSize(value: number): BlockInfo;

    getMedianTime(): number;
    setMedianTime(value: number): BlockInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockInfo.AsObject;
    static toObject(includeInstance: boolean, msg: BlockInfo): BlockInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BlockInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockInfo;
    static deserializeBinaryFromReader(message: BlockInfo, reader: jspb.BinaryReader): BlockInfo;
}

export namespace BlockInfo {
    export type AsObject = {
        hash: Uint8Array | string,
        height: number,
        version: number,
        previousBlock: Uint8Array | string,
        merkleRoot: Uint8Array | string,
        timestamp: number,
        bits: number,
        nonce: number,
        confirmations: number,
        difficulty: number,
        nextBlockHash: Uint8Array | string,
        size: number,
        medianTime: number,
    }
}

export class Block extends jspb.Message { 

    hasInfo(): boolean;
    clearInfo(): void;
    getInfo(): BlockInfo | undefined;
    setInfo(value?: BlockInfo): Block;

    clearTransactionDataList(): void;
    getTransactionDataList(): Array<Block.TransactionData>;
    setTransactionDataList(value: Array<Block.TransactionData>): Block;
    addTransactionData(value?: Block.TransactionData, index?: number): Block.TransactionData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Block.AsObject;
    static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Block;
    static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
    export type AsObject = {
        info?: BlockInfo.AsObject,
        transactionDataList: Array<Block.TransactionData.AsObject>,
    }


    export class TransactionData extends jspb.Message { 

        hasTransactionHash(): boolean;
        clearTransactionHash(): void;
        getTransactionHash(): Uint8Array | string;
        getTransactionHash_asU8(): Uint8Array;
        getTransactionHash_asB64(): string;
        setTransactionHash(value: Uint8Array | string): TransactionData;


        hasTransaction(): boolean;
        clearTransaction(): void;
        getTransaction(): Transaction | undefined;
        setTransaction(value?: Transaction): TransactionData;


        getTxidsOrTxsCase(): TransactionData.TxidsOrTxsCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TransactionData.AsObject;
        static toObject(includeInstance: boolean, msg: TransactionData): TransactionData.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TransactionData, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TransactionData;
        static deserializeBinaryFromReader(message: TransactionData, reader: jspb.BinaryReader): TransactionData;
    }

    export namespace TransactionData {
        export type AsObject = {
            transactionHash: Uint8Array | string,
            transaction?: Transaction.AsObject,
        }

        export enum TxidsOrTxsCase {
            TXIDS_OR_TXS_NOT_SET = 0,
        
    TRANSACTION_HASH = 1,

    TRANSACTION = 2,

        }

    }

}

export class Transaction extends jspb.Message { 
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): Transaction;

    getVersion(): number;
    setVersion(value: number): Transaction;

    clearInputsList(): void;
    getInputsList(): Array<Transaction.Input>;
    setInputsList(value: Array<Transaction.Input>): Transaction;
    addInputs(value?: Transaction.Input, index?: number): Transaction.Input;

    clearOutputsList(): void;
    getOutputsList(): Array<Transaction.Output>;
    setOutputsList(value: Array<Transaction.Output>): Transaction;
    addOutputs(value?: Transaction.Output, index?: number): Transaction.Output;

    getLockTime(): number;
    setLockTime(value: number): Transaction;

    getSize(): number;
    setSize(value: number): Transaction;

    getTimestamp(): number;
    setTimestamp(value: number): Transaction;

    getConfirmations(): number;
    setConfirmations(value: number): Transaction;

    getBlockHeight(): number;
    setBlockHeight(value: number): Transaction;

    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): Transaction;


    hasSlpTransactionInfo(): boolean;
    clearSlpTransactionInfo(): void;
    getSlpTransactionInfo(): SlpTransactionInfo | undefined;
    setSlpTransactionInfo(value?: SlpTransactionInfo): Transaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Transaction.AsObject;
    static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Transaction;
    static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
    export type AsObject = {
        hash: Uint8Array | string,
        version: number,
        inputsList: Array<Transaction.Input.AsObject>,
        outputsList: Array<Transaction.Output.AsObject>,
        lockTime: number,
        size: number,
        timestamp: number,
        confirmations: number,
        blockHeight: number,
        blockHash: Uint8Array | string,
        slpTransactionInfo?: SlpTransactionInfo.AsObject,
    }


    export class Input extends jspb.Message { 
        getIndex(): number;
        setIndex(value: number): Input;


        hasOutpoint(): boolean;
        clearOutpoint(): void;
        getOutpoint(): Transaction.Input.Outpoint | undefined;
        setOutpoint(value?: Transaction.Input.Outpoint): Input;

        getSignatureScript(): Uint8Array | string;
        getSignatureScript_asU8(): Uint8Array;
        getSignatureScript_asB64(): string;
        setSignatureScript(value: Uint8Array | string): Input;

        getSequence(): number;
        setSequence(value: number): Input;

        getValue(): number;
        setValue(value: number): Input;

        getPreviousScript(): Uint8Array | string;
        getPreviousScript_asU8(): Uint8Array;
        getPreviousScript_asB64(): string;
        setPreviousScript(value: Uint8Array | string): Input;

        getAddress(): string;
        setAddress(value: string): Input;


        hasSlpToken(): boolean;
        clearSlpToken(): void;
        getSlpToken(): SlpToken | undefined;
        setSlpToken(value?: SlpToken): Input;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Input.AsObject;
        static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Input;
        static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
    }

    export namespace Input {
        export type AsObject = {
            index: number,
            outpoint?: Transaction.Input.Outpoint.AsObject,
            signatureScript: Uint8Array | string,
            sequence: number,
            value: number,
            previousScript: Uint8Array | string,
            address: string,
            slpToken?: SlpToken.AsObject,
        }


        export class Outpoint extends jspb.Message { 
            getHash(): Uint8Array | string;
            getHash_asU8(): Uint8Array;
            getHash_asB64(): string;
            setHash(value: Uint8Array | string): Outpoint;

            getIndex(): number;
            setIndex(value: number): Outpoint;


            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Outpoint.AsObject;
            static toObject(includeInstance: boolean, msg: Outpoint): Outpoint.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Outpoint, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Outpoint;
            static deserializeBinaryFromReader(message: Outpoint, reader: jspb.BinaryReader): Outpoint;
        }

        export namespace Outpoint {
            export type AsObject = {
                hash: Uint8Array | string,
                index: number,
            }
        }

    }

    export class Output extends jspb.Message { 
        getIndex(): number;
        setIndex(value: number): Output;

        getValue(): number;
        setValue(value: number): Output;

        getPubkeyScript(): Uint8Array | string;
        getPubkeyScript_asU8(): Uint8Array;
        getPubkeyScript_asB64(): string;
        setPubkeyScript(value: Uint8Array | string): Output;

        getAddress(): string;
        setAddress(value: string): Output;

        getScriptClass(): string;
        setScriptClass(value: string): Output;

        getDisassembledScript(): string;
        setDisassembledScript(value: string): Output;


        hasSlpToken(): boolean;
        clearSlpToken(): void;
        getSlpToken(): SlpToken | undefined;
        setSlpToken(value?: SlpToken): Output;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            index: number,
            value: number,
            pubkeyScript: Uint8Array | string,
            address: string,
            scriptClass: string,
            disassembledScript: string,
            slpToken?: SlpToken.AsObject,
        }
    }

}

export class MempoolTransaction extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): Transaction | undefined;
    setTransaction(value?: Transaction): MempoolTransaction;

    getAddedTime(): number;
    setAddedTime(value: number): MempoolTransaction;

    getAddedHeight(): number;
    setAddedHeight(value: number): MempoolTransaction;

    getFee(): number;
    setFee(value: number): MempoolTransaction;

    getFeePerKb(): number;
    setFeePerKb(value: number): MempoolTransaction;

    getStartingPriority(): number;
    setStartingPriority(value: number): MempoolTransaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MempoolTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: MempoolTransaction): MempoolTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MempoolTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MempoolTransaction;
    static deserializeBinaryFromReader(message: MempoolTransaction, reader: jspb.BinaryReader): MempoolTransaction;
}

export namespace MempoolTransaction {
    export type AsObject = {
        transaction?: Transaction.AsObject,
        addedTime: number,
        addedHeight: number,
        fee: number,
        feePerKb: number,
        startingPriority: number,
    }
}

export class UnspentOutput extends jspb.Message { 

    hasOutpoint(): boolean;
    clearOutpoint(): void;
    getOutpoint(): Transaction.Input.Outpoint | undefined;
    setOutpoint(value?: Transaction.Input.Outpoint): UnspentOutput;

    getPubkeyScript(): Uint8Array | string;
    getPubkeyScript_asU8(): Uint8Array;
    getPubkeyScript_asB64(): string;
    setPubkeyScript(value: Uint8Array | string): UnspentOutput;

    getValue(): number;
    setValue(value: number): UnspentOutput;

    getIsCoinbase(): boolean;
    setIsCoinbase(value: boolean): UnspentOutput;

    getBlockHeight(): number;
    setBlockHeight(value: number): UnspentOutput;


    hasSlpToken(): boolean;
    clearSlpToken(): void;
    getSlpToken(): SlpToken | undefined;
    setSlpToken(value?: SlpToken): UnspentOutput;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UnspentOutput.AsObject;
    static toObject(includeInstance: boolean, msg: UnspentOutput): UnspentOutput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UnspentOutput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UnspentOutput;
    static deserializeBinaryFromReader(message: UnspentOutput, reader: jspb.BinaryReader): UnspentOutput;
}

export namespace UnspentOutput {
    export type AsObject = {
        outpoint?: Transaction.Input.Outpoint.AsObject,
        pubkeyScript: Uint8Array | string,
        value: number,
        isCoinbase: boolean,
        blockHeight: number,
        slpToken?: SlpToken.AsObject,
    }
}

export class TransactionFilter extends jspb.Message { 
    clearAddressesList(): void;
    getAddressesList(): Array<string>;
    setAddressesList(value: Array<string>): TransactionFilter;
    addAddresses(value: string, index?: number): string;

    clearOutpointsList(): void;
    getOutpointsList(): Array<Transaction.Input.Outpoint>;
    setOutpointsList(value: Array<Transaction.Input.Outpoint>): TransactionFilter;
    addOutpoints(value?: Transaction.Input.Outpoint, index?: number): Transaction.Input.Outpoint;

    clearDataElementsList(): void;
    getDataElementsList(): Array<Uint8Array | string>;
    getDataElementsList_asU8(): Array<Uint8Array>;
    getDataElementsList_asB64(): Array<string>;
    setDataElementsList(value: Array<Uint8Array | string>): TransactionFilter;
    addDataElements(value: Uint8Array | string, index?: number): Uint8Array | string;

    getAllTransactions(): boolean;
    setAllTransactions(value: boolean): TransactionFilter;

    getAllSlpTransactions(): boolean;
    setAllSlpTransactions(value: boolean): TransactionFilter;

    clearSlpTokenIdsList(): void;
    getSlpTokenIdsList(): Array<Uint8Array | string>;
    getSlpTokenIdsList_asU8(): Array<Uint8Array>;
    getSlpTokenIdsList_asB64(): Array<string>;
    setSlpTokenIdsList(value: Array<Uint8Array | string>): TransactionFilter;
    addSlpTokenIds(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionFilter.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionFilter): TransactionFilter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionFilter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionFilter;
    static deserializeBinaryFromReader(message: TransactionFilter, reader: jspb.BinaryReader): TransactionFilter;
}

export namespace TransactionFilter {
    export type AsObject = {
        addressesList: Array<string>,
        outpointsList: Array<Transaction.Input.Outpoint.AsObject>,
        dataElementsList: Array<Uint8Array | string>,
        allTransactions: boolean,
        allSlpTransactions: boolean,
        slpTokenIdsList: Array<Uint8Array | string>,
    }
}

export class SlpToken extends jspb.Message { 
    getTokenId(): Uint8Array | string;
    getTokenId_asU8(): Uint8Array;
    getTokenId_asB64(): string;
    setTokenId(value: Uint8Array | string): SlpToken;

    getAmount(): string;
    setAmount(value: string): SlpToken;

    getIsMintBaton(): boolean;
    setIsMintBaton(value: boolean): SlpToken;

    getAddress(): string;
    setAddress(value: string): SlpToken;

    getDecimals(): number;
    setDecimals(value: number): SlpToken;

    getSlpAction(): SlpAction;
    setSlpAction(value: SlpAction): SlpToken;

    getTokenType(): number;
    setTokenType(value: number): SlpToken;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpToken.AsObject;
    static toObject(includeInstance: boolean, msg: SlpToken): SlpToken.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpToken, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpToken;
    static deserializeBinaryFromReader(message: SlpToken, reader: jspb.BinaryReader): SlpToken;
}

export namespace SlpToken {
    export type AsObject = {
        tokenId: Uint8Array | string,
        amount: string,
        isMintBaton: boolean,
        address: string,
        decimals: number,
        slpAction: SlpAction,
        tokenType: number,
    }
}

export class SlpTransactionInfo extends jspb.Message { 
    getSlpAction(): SlpAction;
    setSlpAction(value: SlpAction): SlpTransactionInfo;

    getValidityJudgement(): SlpTransactionInfo.ValidityJudgement;
    setValidityJudgement(value: SlpTransactionInfo.ValidityJudgement): SlpTransactionInfo;

    getParseError(): string;
    setParseError(value: string): SlpTransactionInfo;

    getTokenId(): Uint8Array | string;
    getTokenId_asU8(): Uint8Array;
    getTokenId_asB64(): string;
    setTokenId(value: Uint8Array | string): SlpTransactionInfo;

    clearBurnFlagsList(): void;
    getBurnFlagsList(): Array<SlpTransactionInfo.BurnFlags>;
    setBurnFlagsList(value: Array<SlpTransactionInfo.BurnFlags>): SlpTransactionInfo;
    addBurnFlags(value: SlpTransactionInfo.BurnFlags, index?: number): SlpTransactionInfo.BurnFlags;


    hasV1Genesis(): boolean;
    clearV1Genesis(): void;
    getV1Genesis(): SlpV1GenesisMetadata | undefined;
    setV1Genesis(value?: SlpV1GenesisMetadata): SlpTransactionInfo;


    hasV1Mint(): boolean;
    clearV1Mint(): void;
    getV1Mint(): SlpV1MintMetadata | undefined;
    setV1Mint(value?: SlpV1MintMetadata): SlpTransactionInfo;


    hasV1Send(): boolean;
    clearV1Send(): void;
    getV1Send(): SlpV1SendMetadata | undefined;
    setV1Send(value?: SlpV1SendMetadata): SlpTransactionInfo;


    hasNft1ChildGenesis(): boolean;
    clearNft1ChildGenesis(): void;
    getNft1ChildGenesis(): SlpNft1ChildGenesisMetadata | undefined;
    setNft1ChildGenesis(value?: SlpNft1ChildGenesisMetadata): SlpTransactionInfo;


    hasNft1ChildSend(): boolean;
    clearNft1ChildSend(): void;
    getNft1ChildSend(): SlpNft1ChildSendMetadata | undefined;
    setNft1ChildSend(value?: SlpNft1ChildSendMetadata): SlpTransactionInfo;


    getTxMetadataCase(): SlpTransactionInfo.TxMetadataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpTransactionInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SlpTransactionInfo): SlpTransactionInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpTransactionInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpTransactionInfo;
    static deserializeBinaryFromReader(message: SlpTransactionInfo, reader: jspb.BinaryReader): SlpTransactionInfo;
}

export namespace SlpTransactionInfo {
    export type AsObject = {
        slpAction: SlpAction,
        validityJudgement: SlpTransactionInfo.ValidityJudgement,
        parseError: string,
        tokenId: Uint8Array | string,
        burnFlagsList: Array<SlpTransactionInfo.BurnFlags>,
        v1Genesis?: SlpV1GenesisMetadata.AsObject,
        v1Mint?: SlpV1MintMetadata.AsObject,
        v1Send?: SlpV1SendMetadata.AsObject,
        nft1ChildGenesis?: SlpNft1ChildGenesisMetadata.AsObject,
        nft1ChildSend?: SlpNft1ChildSendMetadata.AsObject,
    }

    export enum ValidityJudgement {
    UNKNOWN_OR_INVALID = 0,
    VALID = 1,
    }

    export enum BurnFlags {
    BURNED_INPUTS_OUTPUTS_TOO_HIGH = 0,
    BURNED_INPUTS_BAD_OPRETURN = 1,
    BURNED_INPUTS_OTHER_TOKEN = 2,
    BURNED_OUTPUTS_MISSING_BCH_VOUT = 3,
    BURNED_INPUTS_GREATER_THAN_OUTPUTS = 4,
    }


    export enum TxMetadataCase {
        TX_METADATA_NOT_SET = 0,
    
    V1_GENESIS = 6,

    V1_MINT = 7,

    V1_SEND = 8,

    NFT1_CHILD_GENESIS = 9,

    NFT1_CHILD_SEND = 10,

    }

}

export class SlpV1GenesisMetadata extends jspb.Message { 
    getName(): Uint8Array | string;
    getName_asU8(): Uint8Array;
    getName_asB64(): string;
    setName(value: Uint8Array | string): SlpV1GenesisMetadata;

    getTicker(): Uint8Array | string;
    getTicker_asU8(): Uint8Array;
    getTicker_asB64(): string;
    setTicker(value: Uint8Array | string): SlpV1GenesisMetadata;

    getDocumentUrl(): Uint8Array | string;
    getDocumentUrl_asU8(): Uint8Array;
    getDocumentUrl_asB64(): string;
    setDocumentUrl(value: Uint8Array | string): SlpV1GenesisMetadata;

    getDocumentHash(): Uint8Array | string;
    getDocumentHash_asU8(): Uint8Array;
    getDocumentHash_asB64(): string;
    setDocumentHash(value: Uint8Array | string): SlpV1GenesisMetadata;

    getDecimals(): number;
    setDecimals(value: number): SlpV1GenesisMetadata;

    getMintBatonVout(): number;
    setMintBatonVout(value: number): SlpV1GenesisMetadata;

    getMintAmount(): string;
    setMintAmount(value: string): SlpV1GenesisMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpV1GenesisMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SlpV1GenesisMetadata): SlpV1GenesisMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpV1GenesisMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpV1GenesisMetadata;
    static deserializeBinaryFromReader(message: SlpV1GenesisMetadata, reader: jspb.BinaryReader): SlpV1GenesisMetadata;
}

export namespace SlpV1GenesisMetadata {
    export type AsObject = {
        name: Uint8Array | string,
        ticker: Uint8Array | string,
        documentUrl: Uint8Array | string,
        documentHash: Uint8Array | string,
        decimals: number,
        mintBatonVout: number,
        mintAmount: string,
    }
}

export class SlpV1MintMetadata extends jspb.Message { 
    getMintBatonVout(): number;
    setMintBatonVout(value: number): SlpV1MintMetadata;

    getMintAmount(): string;
    setMintAmount(value: string): SlpV1MintMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpV1MintMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SlpV1MintMetadata): SlpV1MintMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpV1MintMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpV1MintMetadata;
    static deserializeBinaryFromReader(message: SlpV1MintMetadata, reader: jspb.BinaryReader): SlpV1MintMetadata;
}

export namespace SlpV1MintMetadata {
    export type AsObject = {
        mintBatonVout: number,
        mintAmount: string,
    }
}

export class SlpV1SendMetadata extends jspb.Message { 
    clearAmountsList(): void;
    getAmountsList(): Array<string>;
    setAmountsList(value: Array<string>): SlpV1SendMetadata;
    addAmounts(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpV1SendMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SlpV1SendMetadata): SlpV1SendMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpV1SendMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpV1SendMetadata;
    static deserializeBinaryFromReader(message: SlpV1SendMetadata, reader: jspb.BinaryReader): SlpV1SendMetadata;
}

export namespace SlpV1SendMetadata {
    export type AsObject = {
        amountsList: Array<string>,
    }
}

export class SlpNft1ChildGenesisMetadata extends jspb.Message { 
    getName(): Uint8Array | string;
    getName_asU8(): Uint8Array;
    getName_asB64(): string;
    setName(value: Uint8Array | string): SlpNft1ChildGenesisMetadata;

    getTicker(): Uint8Array | string;
    getTicker_asU8(): Uint8Array;
    getTicker_asB64(): string;
    setTicker(value: Uint8Array | string): SlpNft1ChildGenesisMetadata;

    getDocumentUrl(): Uint8Array | string;
    getDocumentUrl_asU8(): Uint8Array;
    getDocumentUrl_asB64(): string;
    setDocumentUrl(value: Uint8Array | string): SlpNft1ChildGenesisMetadata;

    getDocumentHash(): Uint8Array | string;
    getDocumentHash_asU8(): Uint8Array;
    getDocumentHash_asB64(): string;
    setDocumentHash(value: Uint8Array | string): SlpNft1ChildGenesisMetadata;

    getDecimals(): number;
    setDecimals(value: number): SlpNft1ChildGenesisMetadata;

    getGroupTokenId(): Uint8Array | string;
    getGroupTokenId_asU8(): Uint8Array;
    getGroupTokenId_asB64(): string;
    setGroupTokenId(value: Uint8Array | string): SlpNft1ChildGenesisMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpNft1ChildGenesisMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SlpNft1ChildGenesisMetadata): SlpNft1ChildGenesisMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpNft1ChildGenesisMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpNft1ChildGenesisMetadata;
    static deserializeBinaryFromReader(message: SlpNft1ChildGenesisMetadata, reader: jspb.BinaryReader): SlpNft1ChildGenesisMetadata;
}

export namespace SlpNft1ChildGenesisMetadata {
    export type AsObject = {
        name: Uint8Array | string,
        ticker: Uint8Array | string,
        documentUrl: Uint8Array | string,
        documentHash: Uint8Array | string,
        decimals: number,
        groupTokenId: Uint8Array | string,
    }
}

export class SlpNft1ChildSendMetadata extends jspb.Message { 
    getGroupTokenId(): Uint8Array | string;
    getGroupTokenId_asU8(): Uint8Array;
    getGroupTokenId_asB64(): string;
    setGroupTokenId(value: Uint8Array | string): SlpNft1ChildSendMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpNft1ChildSendMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SlpNft1ChildSendMetadata): SlpNft1ChildSendMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpNft1ChildSendMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpNft1ChildSendMetadata;
    static deserializeBinaryFromReader(message: SlpNft1ChildSendMetadata, reader: jspb.BinaryReader): SlpNft1ChildSendMetadata;
}

export namespace SlpNft1ChildSendMetadata {
    export type AsObject = {
        groupTokenId: Uint8Array | string,
    }
}

export class TokenMetadata extends jspb.Message { 
    getTokenId(): Uint8Array | string;
    getTokenId_asU8(): Uint8Array;
    getTokenId_asB64(): string;
    setTokenId(value: Uint8Array | string): TokenMetadata;

    getTokenType(): number;
    setTokenType(value: number): TokenMetadata;


    hasType1(): boolean;
    clearType1(): void;
    getType1(): TokenMetadataTokenType1 | undefined;
    setType1(value?: TokenMetadataTokenType1): TokenMetadata;


    hasNft1Group(): boolean;
    clearNft1Group(): void;
    getNft1Group(): TokenMetadataNFT1Group | undefined;
    setNft1Group(value?: TokenMetadataNFT1Group): TokenMetadata;


    hasNft1Child(): boolean;
    clearNft1Child(): void;
    getNft1Child(): TokenMetadataNFT1Child | undefined;
    setNft1Child(value?: TokenMetadataNFT1Child): TokenMetadata;


    getTypeMetadataCase(): TokenMetadata.TypeMetadataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: TokenMetadata): TokenMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenMetadata;
    static deserializeBinaryFromReader(message: TokenMetadata, reader: jspb.BinaryReader): TokenMetadata;
}

export namespace TokenMetadata {
    export type AsObject = {
        tokenId: Uint8Array | string,
        tokenType: number,
        type1?: TokenMetadataTokenType1.AsObject,
        nft1Group?: TokenMetadataNFT1Group.AsObject,
        nft1Child?: TokenMetadataNFT1Child.AsObject,
    }

    export enum TypeMetadataCase {
        TYPE_METADATA_NOT_SET = 0,
    
    TYPE1 = 3,

    NFT1_GROUP = 4,

    NFT1_CHILD = 5,

    }

}

export class TokenMetadataTokenType1 extends jspb.Message { 
    getTokenTicker(): Uint8Array | string;
    getTokenTicker_asU8(): Uint8Array;
    getTokenTicker_asB64(): string;
    setTokenTicker(value: Uint8Array | string): TokenMetadataTokenType1;

    getTokenName(): Uint8Array | string;
    getTokenName_asU8(): Uint8Array;
    getTokenName_asB64(): string;
    setTokenName(value: Uint8Array | string): TokenMetadataTokenType1;

    getTokenDocumentUrl(): Uint8Array | string;
    getTokenDocumentUrl_asU8(): Uint8Array;
    getTokenDocumentUrl_asB64(): string;
    setTokenDocumentUrl(value: Uint8Array | string): TokenMetadataTokenType1;

    getTokenDocumentHash(): Uint8Array | string;
    getTokenDocumentHash_asU8(): Uint8Array;
    getTokenDocumentHash_asB64(): string;
    setTokenDocumentHash(value: Uint8Array | string): TokenMetadataTokenType1;

    getDecimals(): number;
    setDecimals(value: number): TokenMetadataTokenType1;

    getMintBatonTxid(): Uint8Array | string;
    getMintBatonTxid_asU8(): Uint8Array;
    getMintBatonTxid_asB64(): string;
    setMintBatonTxid(value: Uint8Array | string): TokenMetadataTokenType1;

    getMintBatonVout(): number;
    setMintBatonVout(value: number): TokenMetadataTokenType1;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenMetadataTokenType1.AsObject;
    static toObject(includeInstance: boolean, msg: TokenMetadataTokenType1): TokenMetadataTokenType1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenMetadataTokenType1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenMetadataTokenType1;
    static deserializeBinaryFromReader(message: TokenMetadataTokenType1, reader: jspb.BinaryReader): TokenMetadataTokenType1;
}

export namespace TokenMetadataTokenType1 {
    export type AsObject = {
        tokenTicker: Uint8Array | string,
        tokenName: Uint8Array | string,
        tokenDocumentUrl: Uint8Array | string,
        tokenDocumentHash: Uint8Array | string,
        decimals: number,
        mintBatonTxid: Uint8Array | string,
        mintBatonVout: number,
    }
}

export class TokenMetadataNFT1Group extends jspb.Message { 
    getTokenTicker(): Uint8Array | string;
    getTokenTicker_asU8(): Uint8Array;
    getTokenTicker_asB64(): string;
    setTokenTicker(value: Uint8Array | string): TokenMetadataNFT1Group;

    getTokenName(): Uint8Array | string;
    getTokenName_asU8(): Uint8Array;
    getTokenName_asB64(): string;
    setTokenName(value: Uint8Array | string): TokenMetadataNFT1Group;

    getTokenDocumentUrl(): Uint8Array | string;
    getTokenDocumentUrl_asU8(): Uint8Array;
    getTokenDocumentUrl_asB64(): string;
    setTokenDocumentUrl(value: Uint8Array | string): TokenMetadataNFT1Group;

    getTokenDocumentHash(): Uint8Array | string;
    getTokenDocumentHash_asU8(): Uint8Array;
    getTokenDocumentHash_asB64(): string;
    setTokenDocumentHash(value: Uint8Array | string): TokenMetadataNFT1Group;

    getDecimals(): number;
    setDecimals(value: number): TokenMetadataNFT1Group;

    getMintBatonTxid(): Uint8Array | string;
    getMintBatonTxid_asU8(): Uint8Array;
    getMintBatonTxid_asB64(): string;
    setMintBatonTxid(value: Uint8Array | string): TokenMetadataNFT1Group;

    getMintBatonVout(): number;
    setMintBatonVout(value: number): TokenMetadataNFT1Group;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenMetadataNFT1Group.AsObject;
    static toObject(includeInstance: boolean, msg: TokenMetadataNFT1Group): TokenMetadataNFT1Group.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenMetadataNFT1Group, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenMetadataNFT1Group;
    static deserializeBinaryFromReader(message: TokenMetadataNFT1Group, reader: jspb.BinaryReader): TokenMetadataNFT1Group;
}

export namespace TokenMetadataNFT1Group {
    export type AsObject = {
        tokenTicker: Uint8Array | string,
        tokenName: Uint8Array | string,
        tokenDocumentUrl: Uint8Array | string,
        tokenDocumentHash: Uint8Array | string,
        decimals: number,
        mintBatonTxid: Uint8Array | string,
        mintBatonVout: number,
    }
}

export class TokenMetadataNFT1Child extends jspb.Message { 
    getTokenTicker(): Uint8Array | string;
    getTokenTicker_asU8(): Uint8Array;
    getTokenTicker_asB64(): string;
    setTokenTicker(value: Uint8Array | string): TokenMetadataNFT1Child;

    getTokenName(): Uint8Array | string;
    getTokenName_asU8(): Uint8Array;
    getTokenName_asB64(): string;
    setTokenName(value: Uint8Array | string): TokenMetadataNFT1Child;

    getTokenDocumentUrl(): Uint8Array | string;
    getTokenDocumentUrl_asU8(): Uint8Array;
    getTokenDocumentUrl_asB64(): string;
    setTokenDocumentUrl(value: Uint8Array | string): TokenMetadataNFT1Child;

    getTokenDocumentHash(): Uint8Array | string;
    getTokenDocumentHash_asU8(): Uint8Array;
    getTokenDocumentHash_asB64(): string;
    setTokenDocumentHash(value: Uint8Array | string): TokenMetadataNFT1Child;

    getGroupId(): Uint8Array | string;
    getGroupId_asU8(): Uint8Array;
    getGroupId_asB64(): string;
    setGroupId(value: Uint8Array | string): TokenMetadataNFT1Child;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenMetadataNFT1Child.AsObject;
    static toObject(includeInstance: boolean, msg: TokenMetadataNFT1Child): TokenMetadataNFT1Child.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenMetadataNFT1Child, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenMetadataNFT1Child;
    static deserializeBinaryFromReader(message: TokenMetadataNFT1Child, reader: jspb.BinaryReader): TokenMetadataNFT1Child;
}

export namespace TokenMetadataNFT1Child {
    export type AsObject = {
        tokenTicker: Uint8Array | string,
        tokenName: Uint8Array | string,
        tokenDocumentUrl: Uint8Array | string,
        tokenDocumentHash: Uint8Array | string,
        groupId: Uint8Array | string,
    }
}

export class SlpRequiredBurn extends jspb.Message { 

    hasOutpoint(): boolean;
    clearOutpoint(): void;
    getOutpoint(): Transaction.Input.Outpoint | undefined;
    setOutpoint(value?: Transaction.Input.Outpoint): SlpRequiredBurn;

    getTokenId(): Uint8Array | string;
    getTokenId_asU8(): Uint8Array;
    getTokenId_asB64(): string;
    setTokenId(value: Uint8Array | string): SlpRequiredBurn;

    getTokenType(): number;
    setTokenType(value: number): SlpRequiredBurn;


    hasAmount(): boolean;
    clearAmount(): void;
    getAmount(): string;
    setAmount(value: string): SlpRequiredBurn;


    hasMintBatonVout(): boolean;
    clearMintBatonVout(): void;
    getMintBatonVout(): number;
    setMintBatonVout(value: number): SlpRequiredBurn;


    getBurnIntentionCase(): SlpRequiredBurn.BurnIntentionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SlpRequiredBurn.AsObject;
    static toObject(includeInstance: boolean, msg: SlpRequiredBurn): SlpRequiredBurn.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SlpRequiredBurn, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SlpRequiredBurn;
    static deserializeBinaryFromReader(message: SlpRequiredBurn, reader: jspb.BinaryReader): SlpRequiredBurn;
}

export namespace SlpRequiredBurn {
    export type AsObject = {
        outpoint?: Transaction.Input.Outpoint.AsObject,
        tokenId: Uint8Array | string,
        tokenType: number,
        amount: string,
        mintBatonVout: number,
    }

    export enum BurnIntentionCase {
        BURN_INTENTION_NOT_SET = 0,
    
    AMOUNT = 4,

    MINT_BATON_VOUT = 5,

    }

}

export enum SlpAction {
    NON_SLP = 0,
    NON_SLP_BURN = 1,
    SLP_PARSE_ERROR = 2,
    SLP_UNSUPPORTED_VERSION = 3,
    SLP_V1_GENESIS = 4,
    SLP_V1_MINT = 5,
    SLP_V1_SEND = 6,
    SLP_NFT1_GROUP_GENESIS = 7,
    SLP_NFT1_GROUP_MINT = 8,
    SLP_NFT1_GROUP_SEND = 9,
    SLP_NFT1_UNIQUE_CHILD_GENESIS = 10,
    SLP_NFT1_UNIQUE_CHILD_SEND = 11,
}
