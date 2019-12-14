# BCHD gRPC Interface for Node.js Clients


## Install
`npm i grpc-bchrpc-node` (for web-browser based projects see [this](https://github.com/jcramer/grpc-bchrpc-web) version)


### Build from source (from `./bchrpc.proto`)
1. Install Protocol Compiler from: https://github.com/protocolbuffers/protobuf
2. `npm install`
3. `npm run build && tsc`


## Example usage

In this simple example we create a new client that connects to `bchd.greyh.at:8335` by default.  We call `getRawTransaction` and then print the results to the console.  We use `reverseOrder` in call to getRawTransaction because BCHD works with transaction hash not the conventional reversed hash/txid.

```ts
let grpc = new GrpcClient();
let txid = "11556da6ee3cb1d14727b3a8f4b37093b6fecd2bc7d577a02b4e98b7be58a7e8";
let res = await grpc.getRawTransaction({ hash: txid, reverseOrder: true });
console.log(Buffer.from(res.getTransaction_asU8()).toString('hex'));
```

## BCHD Servers
* https://bchd.greyh.at:8335
* https://bchd.imaginary.cash:8335
* https://bchd-testnet.greyh.at:18335


## Change Log

### 0.9.0
- Fix the `submitTransaction` method

### 0.8.0
- Rename "getUnspentTransaction" to "getUnspentOutput"

### 0.7.1
- Add "getAddressTransactions" method and new unit test

### 0.7.0
- Add an initial unit tests (WIP)
- Add linting
- Add submitTransaction method
- (breaking change) Added includeMempool as a destructured parameters in getAddressUtxos

### 0.6.2
- Allow unlimited receive message data size limit by default for node.js gRPC Client
- Add options parameter to client.ts

### 0.6.1
- Added subscribe methods for txn and block notifications  

### 0.6.0
- Updated/added several gRPC methods to client.ts for SLPDB gRPC work

### 0.5.7
- Lock down dep versions to prevent TS compile errors

### 0.5.5
- Update `bchrpc.proto` per BCHD commit [31e5e87](https://github.com/gcash/bchd/blob/master/bchrpc/bchrpc.proto)

### 0.5.4
- Update `bchrpc.proto` per BCHD commit [6f19bfe](https://github.com/gcash/bchd/blob/master/bchrpc/bchrpc.proto)
- Moved tsc to the end of `npm run build` script
- Added get block header method to client.ts

### 0.5.3
- Add testnet flag to Client constructor
- Use destructured params in Client constructor

### 0.5.1 / 0.5.2
- Fix issues with package.json deps

### 0.5.0
- Fix default remote bchd url (removed "https://" in front)
- Add example usage in readme
- Breaking Change: Use destructured parameters in Client.ts methods w/ multiple params
- Turn on Source maps for TypeScript debugging
- Export `./src/Client` class