# BCHD gRPC Interface for Node.js Clients

## Install
`npm install grpc-bchrpc-node --save` (see [web](https://github.com/jcramer/grpc-bchrpc-web) version)

## Build from source (from `./bchrpc.proto`)
1. Install Protocol Compiler from: https://github.com/protocolbuffers/protobuf
2. `npm install`
3. `npm run build && tsc`

## Public Full gRPC Servers
* https://bchd.greyh.at:8335
* https://bchd-testnet.greyh.at:18335

## Example usage

In this simple example we create a new client that connects to `bchd.greyh.at:8335` by default.  We call `getRawTransaction` and then print the results to the console.  We use `reverseOrder` in call to getRawTransaction because BCHD works with transaction hash not the conventional reversed hash/txid.

```ts
let grpc = new GrpcClient();
let txid = "11556da6ee3cb1d14727b3a8f4b37093b6fecd2bc7d577a02b4e98b7be58a7e8";
let res = await grpc.getRawTransaction({ hash: txid, reverseOrder: true });
console.log(Buffer.from(res.getTransaction_asU8()).toString('hex'));
```

## Change Log

### 0.5.0
- Fix default remote bchd url (removed "https://" in front)
- Add example usage in readme
- Breaking Change: Use destructured parameters in Client.ts methods w/ multiple params
- Turn on Source maps for TypeScript debugging
- Export `./src/Client` class