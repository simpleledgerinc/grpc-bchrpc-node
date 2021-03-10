import assert from "assert";
import Big from "big.js";
import fs from "fs";
import { SlpRequiredBurn as ISlpRequiredBurn, SlpV1GenesisMetadata, SlpV1MintMetadata } from "grpc-bchrpc";
import { GetParsedSlpScriptResponse,
            GetSlpGraphSearchResponse,
            GetTrustedSlpValidationResponse,
            GetUnspentOutputResponse,
            SlpRequiredBurn,
            SlpTransactionInfo,
            TokenMetadata,
            Transaction } from "../pb/bchrpc_pb";
import { GrpcClient } from "../src/client";

const scriptUnitTestData: SlpMsgTest[] = require("slp-unit-test-data/script_tests.json");

const grpc = new GrpcClient({ url: "localhost:8335", rootCertPath: "" });

const INCLUDE_KNOWN_BURNS_CHECKS = false;
const INCLUDE_GRAPH_SEARCH_TESTS = false;

describe("grpc-bchrpc-node", () => {

    if (INCLUDE_GRAPH_SEARCH_TESTS) {
        it("graph search without excludes", async function() {
            this.timeout(5000);
                const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
                const excludeList: string[] = [ ];
                let res: GetSlpGraphSearchResponse;
                console.time("GS");
                try {
                    res = await grpc.getGraphSearchFor({ hash: txid, reversedHashOrder: true });
                } catch (err) {
                    console.log(err.message);
                    throw err;
                }
                console.timeEnd("GS");
                let graph = res.getTxdataList_asU8();
                assert.strictEqual(graph.length, 33021);
        });
        it("trusted validation skips gs count", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";

            // check gs count results is skipped without gsKnownValidHashes
            let res2 = await grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1}], reversedHashOrder: true });
            assert.strictEqual(res2.getResultsList()[0].getGraphsearchTxnCount(), 0);
        });
        it("trusted validation includes gs count", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";

            // check gs count results matches original gs count
            let res3 = await grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1 }], reversedHashOrder: true, includeGraphSearchCount: true });
            assert.strictEqual(res3.getResultsList()[0].getGraphsearchTxnCount(), 33021);
        });
        it("does graph search with excludes", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
            const excludeList: string[] = [
                "daaac179106abf8ca2946ee7415d9cca1c6648ce1ba1f5ce3dd4e7ad090482a7",
                "56c2ddcaf9ebb3785f3ca0a1c136c793bd33dd7e019a77bf1193bc8ef77eb38f",
                "9a64336b6f11235b415b278c5690b6538ff14197af00ebc5abf93e318b1debae",
            ];
            let res: GetSlpGraphSearchResponse;
            console.time("GS");
            try {
                res = await grpc.getGraphSearchFor({ hash: txid, reversedHashOrder: true, knownValidHashes: excludeList });
            } catch (err) {
                console.log(err.message);
                throw err;
            }
            console.timeEnd("GS");
            let graph = res.getTxdataList_asU8();
            assert.strictEqual(graph.length, 16);
        });
        it("trusted validation skips gs count", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";

            // check gs count results is skipped without gsKnownValidHashes
            let res2 = await grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1}], reversedHashOrder: true });
            assert.strictEqual(res2.getResultsList()[0].getGraphsearchTxnCount(), 0);
        });
        it("trusted validation includes gs count", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
            const excludeList: string[] = [
                "daaac179106abf8ca2946ee7415d9cca1c6648ce1ba1f5ce3dd4e7ad090482a7",
                "56c2ddcaf9ebb3785f3ca0a1c136c793bd33dd7e019a77bf1193bc8ef77eb38f",
                "9a64336b6f11235b415b278c5690b6538ff14197af00ebc5abf93e318b1debae",
            ];
            // check gs count results matches original gs count
            let res3 = await grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1, gsKnownValidHashes: excludeList }], reversedHashOrder: true, includeGraphSearchCount: true });
            assert.strictEqual(res3.getResultsList()[0].getGraphsearchTxnCount(), 16);
        });
        it("graph search returns error when bad validity cache txn (from bad txid id) is provided", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
            const excludeList: string[] = [
                "daaac179106abf8ca2946ee7415d9cca1c6648ce1ba1f5ce3dd4e7ad090482a7",
                "56c2ddcaf9ebb3785f3ca0a1c136c793bd33dd7e019a77bf1193bc8ef77eb38f",
                "9a64336b6f11235b415b278c5690b6538ff14197af00ebc5abf93e318b1debae",
                "abcd", // extra bad txid
            ];
            // check gs count results matches original gs count
            assert.rejects(
                grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1, gsKnownValidHashes: excludeList }], reversedHashOrder: true, includeGraphSearchCount: true }),
                { message: "13 INTERNAL: graph search validity txid cdab, error: invalid hash length of 2, want 32" }
            );
        });
        it("graph search returns error when bad validity cache txn (from wrong token id) is provided", async () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
            const excludeList: string[] = [
                "daaac179106abf8ca2946ee7415d9cca1c6648ce1ba1f5ce3dd4e7ad090482a7",
                "56c2ddcaf9ebb3785f3ca0a1c136c793bd33dd7e019a77bf1193bc8ef77eb38f",
                "9a64336b6f11235b415b278c5690b6538ff14197af00ebc5abf93e318b1debae",
                "f9134cae8682a9bb98ed1949c983b391eceb5bea9744e0c6a538f83383681221", // extra from wrong token ID
            ];
            // check gs count results matches original gs count
            assert.rejects( 
                grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1, gsKnownValidHashes: excludeList }], reversedHashOrder: true, includeGraphSearchCount: true }),
                { message: "13 INTERNAL: client provided validity cache with hash f9134cae8682a9bb98ed1949c983b391eceb5bea9744e0c6a538f83383681221 that is not in the token graph" }
            );
        });
        it("graph search returns error when bad validity cache txn (non-slp txid) is provided", () => {
            const txid = "3ff425384539519e815507f7f6739d9c12a44af84ff895601606b85157e0fb19";
            const excludeList: string[] = [
                "daaac179106abf8ca2946ee7415d9cca1c6648ce1ba1f5ce3dd4e7ad090482a7",
                "56c2ddcaf9ebb3785f3ca0a1c136c793bd33dd7e019a77bf1193bc8ef77eb38f",
                "9a64336b6f11235b415b278c5690b6538ff14197af00ebc5abf93e318b1debae",
                "089a032d3e0ba9f883f854edc753e3c6d3ed0eedc42bca7d27c3a0f87113ca06", // extra from non-SLP
            ];
            // check gs count results matches original gs count
            assert.rejects(
                grpc.getTrustedSlpValidation({ txos: [{hash: txid, vout: 1, gsKnownValidHashes: excludeList }], reversedHashOrder: true, includeGraphSearchCount: true }), 
                { message: "13 INTERNAL: client provided validity cache with hash 089a032d3e0ba9f883f854edc753e3c6d3ed0eedc42bca7d27c3a0f87113ca06 that is not in the token graph" }
            );
        });
    }
    it("getMempool", async () => {
        const res1 = await grpc.getMempoolInfo();
        assert.ok(res1.getSize());
        const res2 = await grpc.getRawMempool({fullTransactions: true});
        assert.ok(res2.getTransactionDataList().length);

        // check for child NFTs with no group id
        const txns = res2.getTransactionDataList();
        const mintBatonTokenIds = new Set<string>();
        console.log(`Looking through ${txns.length} mempool transactions`);
        for (const txn of txns) {
            const txid = Buffer.from(txn.getTransaction()!.getHash_asU8().reverse()).toString("hex");
            const slpInfo = txn.getTransaction()!.getSlpTransactionInfo()!;
            switch (slpInfo.getTxMetadataCase()!) {
            case SlpTransactionInfo.TxMetadataCase.V1_NFT1_CHILD_GENESIS:
                console.log(`Mint (NFT1 Child Genesis): ${txid}`);
                if (slpInfo.getV1Nft1ChildGenesis()!.getGroupTokenId_asU8().length === 0) {
                    console.log(`Missing NFT Group ID for txid: ${txid}`);
                    assert.ok(false);
                } else {
                    const groupId = Buffer.from(slpInfo.getV1Nft1ChildGenesis()!.getGroupTokenId_asU8()).toString("hex")
                    console.log(`${txid} has group id ${groupId}`);
                }
                break;
            case SlpTransactionInfo.TxMetadataCase.V1_NFT1_CHILD_SEND:
                console.log(`Mint (NFT1 Child Send): ${txid}`);
                if (slpInfo.getV1Nft1ChildSend()!.getGroupTokenId_asU8().length === 0) {
                    console.log(`Missing NFT Group ID for txid: ${txid}`);
                    assert.ok(false);
                } else {
                    const groupId = Buffer.from(slpInfo.getV1Nft1ChildSend()!.getGroupTokenId_asU8()).toString("hex")
                    console.log(`${txid} has group id ${groupId}`);
                }
                break;
            case SlpTransactionInfo.TxMetadataCase.V1_MINT:
            case SlpTransactionInfo.TxMetadataCase.V1_GENESIS:
                var mintInfo: SlpV1GenesisMetadata|SlpV1MintMetadata;
                switch (slpInfo.getTxMetadataCase()) {
                case SlpTransactionInfo.TxMetadataCase.V1_GENESIS:
                    //@ts-ignore
                    mintInfo = slpInfo.getV1Genesis()!;
                    break;
                case SlpTransactionInfo.TxMetadataCase.V1_MINT:
                    //@ts-ignore
                    mintInfo = slpInfo.getV1Mint()!;
                    break;
                default:
                    assert.ok(false);
                }

                if (mintInfo!.getMintBatonVout() > 1) {
                    const tokenId = Buffer.from(slpInfo.getTokenId_asU8()).toString("hex");
                    const tmRes = await grpc.getTokenMetadata([tokenId]);
                    const t = tmRes.getTokenMetadataList()[0];

                    let batonTxid: string;
                    let batonVout: number;
                    switch (t.getTypeMetadataCase()) {
                    case TokenMetadata.TypeMetadataCase.V1_FUNGIBLE:
                        console.log(`Mint (Type 1): ${txid}`);
                        batonTxid = Buffer.from(tmRes.getTokenMetadataList()[0].getV1Fungible()!.getMintBatonHash_asU8().reverse()).toString("hex");
                        batonVout = tmRes.getTokenMetadataList()[0].getV1Fungible()!.getMintBatonVout();
                        break;
                    case TokenMetadata.TypeMetadataCase.V1_NFT1_GROUP:
                        console.log(`Mint (NFT1 Group): ${txid}`);
                        batonTxid = Buffer.from(tmRes.getTokenMetadataList()[0].getV1Nft1Group()!.getMintBatonHash_asU8().reverse()).toString("hex");
                        batonVout = tmRes.getTokenMetadataList()[0].getV1Nft1Group()!.getMintBatonVout();
                        break;
                    default:
                        assert.ok(false);    
                    }

                    if (txid !== batonTxid) {
                        console.log(`Warn: Mismatch baton txid ${txid} tm has baton txid: ${batonTxid}`);
                        mintBatonTokenIds.add(tokenId);
                    } else {
                        mintBatonTokenIds.delete(tokenId);
                        assert.strictEqual(txid, batonTxid);
                        assert.strictEqual(batonVout, mintInfo.getMintBatonVout());
                    }
                }
            }
        }
        if (mintBatonTokenIds.size > 0) {
            console.log(`Warn token ids: ${Array.from(mintBatonTokenIds.keys())}`);
            // assert.ok(mintBatonTokenIds.size === 0);
        }
    });

    it("prevents BURNED_INPUTS_BAD_OPRETURN", async () => {
        const txid = "77d3f678e9283043cb59e3a34fb8921e4fa0442611e5508f40328d2f27adcc1b";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("OP_RETURN magic is wrong size"), true);
    });
    it("prevents BURNED_INPUTS_BAD_OPRETURN even with specifying a required burn", async () => {
        const txid = "77d3f678e9283043cb59e3a34fb8921e4fa0442611e5508f40328d2f27adcc1b";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const allowedOutpoint = new Transaction.Input.Outpoint();
        allowedOutpoint.setHash(
            Buffer.from("b11cac00260aea3647859181ee33f845ab1cc1f698594d69525bbe619d9b94e7", "hex").reverse());
        allowedOutpoint.setIndex(1);
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setOutpoint(allowedOutpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("10000000000");
        let res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("OP_RETURN magic is wrong size"), true);
    });

    it("prevents BURNED_INPUTS_GREATER_THAN_OUTPUTS ", async () => {
        const txid = "e851cdfed152677ea7104526eee44a72653daa7fc1e654547a6056082f588643";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        let res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("inputs are greater than outputs"), true);
    });
    it("allows BURNED_INPUTS_GREATER_THAN_OUTPUTS", async () => {
        const txid = "e851cdfed152677ea7104526eee44a72653daa7fc1e654547a6056082f588643";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setTokenId(
            Buffer.from("263ca75dd8ab35e699808896255212b374f2fb185fb0389297a11f63d8d41f7e", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("999990000000");
        const res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });
    it("allows BURNED_INPUTS_GREATER_THAN_OUTPUTS (using grpc-bchrpc interface)", async () => {
        const txid = "e851cdfed152677ea7104526eee44a72653daa7fc1e654547a6056082f588643";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const requiredSlpBurn: ISlpRequiredBurn = {
            tokenId: Buffer.from("263ca75dd8ab35e699808896255212b374f2fb185fb0389297a11f63d8d41f7e", "hex"),
            tokenType: 1,
            amount: "999990000000"
        };
        const res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });

    it("prevents BURNED_INPUTS_OTHER_TOKEN mint baton when ending mint baton with 0x4c00", async () => {
        const txid = "62a297501652f333335f2cc6f42b575a56dcf582ff2a857e02c0bd3df67564fd";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        let res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("input from the wrong token"), true);
    });
    it("allows BURNED_INPUTS_OTHER_TOKEN, for ending a mint baton", async () => {
        const txid = "62a297501652f333335f2cc6f42b575a56dcf582ff2a857e02c0bd3df67564fd";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const requiredSlpBurn = new SlpRequiredBurn();
        const outpoint = new Transaction.Input.Outpoint();
        outpoint.setHash(
            Buffer.from("170147548aad6de7c1df686c56e4846e0936c4573411b604a18d0ec76482dde2", "hex").reverse());
        outpoint.setIndex(2);
        requiredSlpBurn.setOutpoint(outpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("170147548aad6de7c1df686c56e4846e0936c4573411b604a18d0ec76482dde2", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setMintBatonVout(2);
        let res: any;
        res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });
    it("allows BURNED_INPUTS_OTHER_TOKEN, for ending a mint baton (using grpc-bchrpc interface)", async () => {
        const txid = "62a297501652f333335f2cc6f42b575a56dcf582ff2a857e02c0bd3df67564fd";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const requiredSlpBurn: ISlpRequiredBurn = {
            tokenId: Buffer.from("170147548aad6de7c1df686c56e4846e0936c4573411b604a18d0ec76482dde2", "hex"),
            tokenType: 1,
            outpointHash: Buffer.from("170147548aad6de7c1df686c56e4846e0936c4573411b604a18d0ec76482dde2", "hex").reverse(),
            outpointVout: 2,
            setMintBatonVout: 2
        };
        let res: any;
        res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });

    it("prevents BURNED_INPUTS_OTHER_TOKEN", async () => {
        const txid = "6de528ad5cd7e5b704070e27a02a39d08c5c05d5ce1dbb9b0ef76682ff1ea34e";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        let res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error(`bad validity judgement for: ${txid}`);
        }
        assert.strictEqual(res.getInvalidReason().includes("input from the wrong token"), true);
    });
    it("allows BURNED_INPUTS_OTHER_TOKEN", async () => {
        const txid = "6de528ad5cd7e5b704070e27a02a39d08c5c05d5ce1dbb9b0ef76682ff1ea34e";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const allowedOutpoint = new Transaction.Input.Outpoint();
        allowedOutpoint.setHash(
            Buffer.from("3f871b410486c0c71531c1ee8aea6744a3ff851577a4cc5a7ee89dee773aeb02", "hex").reverse());
        allowedOutpoint.setIndex(1);
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setOutpoint(allowedOutpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("3f871b410486c0c71531c1ee8aea6744a3ff851577a4cc5a7ee89dee773aeb02", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("100000000000000");
        const res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });
    it("allows BURNED_INPUTS_OTHER_TOKEN (using generic grpc-bchrpc interface", async () => {
        const txid = "6de528ad5cd7e5b704070e27a02a39d08c5c05d5ce1dbb9b0ef76682ff1ea34e";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const allowedOutpoint = new Transaction.Input.Outpoint();
        allowedOutpoint.setHash(
            Buffer.from("3f871b410486c0c71531c1ee8aea6744a3ff851577a4cc5a7ee89dee773aeb02", "hex").reverse());
        allowedOutpoint.setIndex(1);
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setOutpoint(allowedOutpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("3f871b410486c0c71531c1ee8aea6744a3ff851577a4cc5a7ee89dee773aeb02", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("100000000000000");
        const res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        assert.strictEqual(res.getIsValid(), true);
    });

    it("prevents BURNED_INPUTS_OUTPUTS_TOO_HIGH ", async () => {
        const txid = "717e47c1edd0fb377a7ae208347ccc31a8a0daa500d477a3c9b8734c92f9e8be";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        let res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("outputs greater than inputs"), true);
    });
    it("prevents BURNED_INPUTS_OUTPUTS_TOO_HIGH even with specifying a required burn", async () => {
        const txid = "717e47c1edd0fb377a7ae208347ccc31a8a0daa500d477a3c9b8734c92f9e8be";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        const allowedOutpoint = new Transaction.Input.Outpoint();
        allowedOutpoint.setHash(
            Buffer.from("8d08297091a32c12e29ae27af16005ea56e1444ef0a858f23b6e5aa6deb02cb2", "hex").reverse());
        allowedOutpoint.setIndex(1);
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setOutpoint(allowedOutpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("a5355579085f9476b681ba909689e64c62e849b7142b607ab5cf1ef465caa9b5", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("10");
        let res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("outputs greater than inputs"), true);
    });

    it("prevents BURNED_OUTPUTS_MISSING_BCH_VOUT missing mint baton vout", async () => {
        const txid = "42eef73441e2c1f0924652530b161b1d4a86a96aeba62444cd2775596c06c677";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
        let doesPrevent = false;
        let res = await grpc.checkSlpTransaction({ txnBuf });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("transaction is missing mint baton output"), true);
    });
    it("prevents BURNED_OUTPUTS_MISSING_BCH_VOUT even with specifying a required burn", async () => {
        const txid = "ab085364157ae90d0f96262c17a522367088b06192494cac05dcbbb4236bafd8";
        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());

        const allowedOutpoint = new Transaction.Input.Outpoint();
        const requiredSlpBurn = new SlpRequiredBurn();
        requiredSlpBurn.setOutpoint(allowedOutpoint);
        requiredSlpBurn.setTokenId(
            Buffer.from("0df768b5485c72645de069b68f66d02205c26f827c608ef5ffa976266d753d50", "hex"));
        requiredSlpBurn.setTokenType(1);
        requiredSlpBurn.setAmount("1099000000000000");
        let res = await grpc.checkSlpTransaction({ txnBuf, requiredSlpBurns: [requiredSlpBurn] });
        if (res.getIsValid()) {
            throw Error("bad validity judgement");
        }
        assert.strictEqual(res.getInvalidReason().includes("transaction is missing outputs"), true);
    });

    if (INCLUDE_KNOWN_BURNS_CHECKS) {
        describe("prevents burns for all transactions", async () => {

            const burnTypes = [
                "BURNED_INPUTS_BAD_OPRETURN",
                "BURNED_INPUTS_GREATER_THAN_OUTPUTS",
                "BURNED_INPUTS_OTHER_TOKEN",
                "BURNED_INPUTS_OUTPUTS_TOO_HIGH",
                "BURNED_OUTPUTS_MISSING_BCH_VOUT"
            ];

            for (const burnType of burnTypes) {

                const filename = `./test/burns/${burnType}.txt`;
                const txids = fs.readFileSync(filename, "utf-8")
                                    .split("\n")
                                    .map((txid) => Buffer.from(txid, "hex").toString("hex"))
                                    .filter((txid) => txid.length === 64);

                for (const txid of txids) {

                    it(txid, async () => {
                        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
                        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
                        let res = await grpc.checkSlpTransaction({ txnBuf });
                        if (res.getIsValid()) {
                            throw Error("bad validity judgement");
                        }
                    });
                }
            }
        });

        describe("check all invalid contains invalidReason", async () => {

            const burnTypes = [
                "BURNED_INPUTS_BAD_OPRETURN",
                "BURNED_INPUTS_GREATER_THAN_OUTPUTS",
                "BURNED_INPUTS_OTHER_TOKEN",
                "BURNED_INPUTS_OUTPUTS_TOO_HIGH",
                "BURNED_OUTPUTS_MISSING_BCH_VOUT"
            ];

            for (const burnType of burnTypes) {

                const filename = `./test/burns/${burnType}.txt`;
                const txids = fs.readFileSync(filename, "utf-8")
                                    .split("\n")
                                    .map((txid) => Buffer.from(txid, "hex").toString("hex"))
                                    .filter((txid) => txid.length === 64);

                for (const txid of txids) {

                    it(txid, async () => {
                        const txnRes = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
                        const txnBuf = Buffer.from(txnRes.getTransaction_asU8());
                        const res = await grpc.checkSlpTransaction({ txnBuf });
                        if (!res.getIsValid()) {
                            assert.ok(res.getInvalidReason() !== "");
                        } else {
                            assert.ok(res.getInvalidReason() === "");
                        }
                    });
                }
            }
        });
    }

    it("getBlockchainInfo", async () => {
        const info = await grpc.getBlockchainInfo();
        assert.ok(info.getSlpIndex());
        if (INCLUDE_GRAPH_SEARCH_TESTS) {
            assert.ok(info.getSlpGraphsearch());
        }
        assert.ok(info.getTxIndex());
        assert.ok(info.getAddrIndex());
        console.log(`Node best block height: ${info.getBestHeight()}`);
    });

    it("getTransaction - token type 1 w/ token metadata", async () => {
        const txidHex = "8a6d226241b96a24ea80c94836fd03251de7138c2a07ada490beb8d1936ea702";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        // check slp token output data (CHECK BIG NUMBER CASE!!)
        const outputs = res.getTransaction()!.getOutputsList();
        let totalAmtOut = Big(0);
        for (const out of outputs) {
            if (out.getSlpToken()) {
                const slpToken = out.getSlpToken()!;
                //const amt = BigInt(slpToken.getAmount()!);
                assert.strictEqual([139200347639, 433852691149408].includes(parseInt(slpToken.getAmount(), 10)), true);
                assert.strictEqual(slpToken.getDecimals(), 8);
                totalAmtOut = totalAmtOut.add(slpToken.getAmount());

                // check slp addresses
                assert.strictEqual([
                    "qprqzzhhve7sgysgf8h29tumywnaeyqm7ykzvpsuxy",
                    "qpluak66akyaz38tsz87teyuma5rf6cqhq664ple3v",
                ].includes(slpToken.getAddress()), true);
            }
        }

        // check slp token input data
        const inputs = res.getTransaction()!.getInputsList();
        let totalAmtIn = Big(0);
        for (const ins of inputs) {
            if (ins.getSlpToken()) {
                const slpToken = ins.getSlpToken()!;
                assert.strictEqual(slpToken.getDecimals(), 8);
                totalAmtIn = totalAmtIn.add(slpToken.getAmount());
            }
        }

        // check inputs == output amount
        assert.strictEqual(totalAmtIn.gt(0), true);
        assert.strictEqual(totalAmtIn.cmp(totalAmtOut), 0);

        // check token metadata
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenName()!).toString("utf8"), "Spice");
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenTicker()).toString("utf8"), "SPICE");
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getDecimals()!, 8);
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenDocumentUrl()).toString("utf8"), "spiceslp@gmail.com");
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getTokenId_asU8()!).toString("hex"), "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf");

        // verify current Mint baton txid / vout
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonHash(), "");
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonVout(), 0);
    });

    it("getTransaction - max uint64 SlpToken", async () => {
        const txidHex = "a7b885eb3ea084c8ba87d045afe89e48e3e5555442aad0ec27fb342bc93f3702";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        // check slp token output data (CHECK BIG NUMBER CASE!!)
        const outputs = res.getTransaction()!.getOutputsList();
        let totalOut = Big(0);
        for (const out of outputs) {
            if (out.getSlpToken()) {
                assert.strictEqual(Big(out.getSlpToken()!.getAmount()).cmp("18446744073709551615"), 0);
                totalOut = totalOut.add(out.getSlpToken()!.getAmount());
            }
        }

        assert.strictEqual(totalOut.cmp(Big("18446744073709551615")), 0);

        // verify Mint baton txid / vout
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonHash(), "");
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonVout(), 0);
    });

    it("getTransaction - NFT1 child genesis", async () => {
        const txidHex = "700f4bfc3e4c744ac12b4de07e2afddec8264e496c4b26c3a2b07567318d6c2b";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        const groupIdExpected = "a2987562a405648a6c5622ed6c205fca6169faa8afeb96a994b48010bd186a66";
        let groupid_1 = Buffer.from(res.getTransaction()!.getSlpTransactionInfo()!.getV1Nft1ChildGenesis()!.getGroupTokenId_asU8()).toString("hex");
        let name = res.getTransaction()!.getSlpTransactionInfo()!.getV1Nft1ChildGenesis()!.getName_asU8();
        let groupid_2 = Buffer.from(res.getTokenMetadata()!.getV1Nft1Child()!.getGroupId_asU8()).toString("hex");
        //assert.strictEqual(groupid_1, groupIdExpected);
        assert.strictEqual(groupid_2, groupIdExpected);
    });

    it("getTransaction - NFT1 child send", async () => {
        const txidHex = "b8fed3e8f768c091329962b4b9785ba802752e270776d1e6446091c8b979b317";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        const groupIdExpected = "a2987562a405648a6c5622ed6c205fca6169faa8afeb96a994b48010bd186a66";
        let groupid_1 = Buffer.from(res.getTransaction()!.getSlpTransactionInfo()!.getV1Nft1ChildSend()!.getGroupTokenId_asU8()).toString("hex");
        let groupid_2 = Buffer.from(res.getTokenMetadata()!.getV1Nft1Child()!.getGroupId_asU8()).toString("hex");
        assert.strictEqual(groupid_1, groupIdExpected);
        assert.strictEqual(groupid_2, groupIdExpected);
    });

    it("getTransaction - mint transaction", async () => {
        const txidHex = "59c30c1e6854a830632fa5486e39fd9243108a7534c3f0918e56aa2bf9f943f5";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        // check slp token output data (CHECK BIG NUMBER CASE!!)
        const outputs = res.getTransaction()!.getOutputsList();
        let totalAmtOut = Big(0);
        for (const out of outputs) {
            if (out.getSlpToken()) {
                const slpToken = out.getSlpToken()!;
                const amt = BigInt(slpToken.getAmount()!);
                assert.strictEqual([133333333, 0].includes(parseInt(slpToken.getAmount(), 10)), true);
                assert.strictEqual(slpToken.getDecimals(), 6);
                totalAmtOut = totalAmtOut.add(slpToken.getAmount());

                // check slp addresses
                assert.strictEqual([
                    "qrzuvtyqs7f843natt3cvl2lenme2tcl3qvvl8ydjj",
                    "pz0n40tkppxq7nq7vewvjtfe2dwre0k2z580r6u7df",
                ].includes(slpToken.getAddress()), true);
            }
        }

        // check slp token input data
        const inputs = res.getTransaction()!.getInputsList();
        let totalAmtIn = Big(0);
        for (const ins of inputs) {
            if (ins.getSlpToken()) {
                const slpToken = ins.getSlpToken()!;
                assert.strictEqual(slpToken.getDecimals(), 6);
                totalAmtIn = totalAmtIn.add(slpToken.getAmount());
                assert.strictEqual(ins.getSlpToken()!.getAddress()!, "pzxda47vant8zcnawh28xf2jgnhap894552ds8rdjr");
            }
        }

        // check inputs == output amount
        assert.strictEqual(totalAmtIn.eq(0), true);
        assert.strictEqual(totalAmtIn.lt(totalAmtOut), true);

        // check token metadata
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenName()!).toString("utf8"), "Mistcoin");
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenTicker()).toString("utf8"), "MIST");
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getDecimals()!, 6);
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getV1Fungible()!.getTokenDocumentUrl()).toString("utf8"), "https://mistcoin.org");
        assert.strictEqual(Buffer.from(res.getTokenMetadata()!.getTokenId_asU8()!).toString("hex"), "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798");

        // verify current Mint baton txid / vout
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonHash().length === 32, true);
        assert.strictEqual(res.getTokenMetadata()!.getV1Fungible()!.getMintBatonVout(), 2);
    });

    it("checkSlpTransaction - passes on non-slp transaction with no slp inputs", async () => {
        const txnBuf = Buffer.from("010000000159d32fbfac980633707f0ba1dd31bc2afca9883951555c71fb47ade981b23e2d000000006441865b06b787af0ad800c6a08f7e3527d63e882204da956af6adb701c618377fe19e2b8024e4a20a1d2c3a70d9adda3c4738ae4ae74a54f350752fb4c0b035eb18412102e5e692f3944761f33f2c83a8956a6cbf00ba263a2f345204f781d634a3d73497feffffff02a0860100000000001976a914a0d7b78ef706572ed79ad9d7d1af4f68ccbe9ede88ac101c3800000000001976a9146cdabebe0346f033a86408facf4ea07d552ba45188acd2280a00", "hex");
        const res = await grpc.checkSlpTransaction({txnBuf});
        assert.strictEqual(res.getIsValid(), false);        
    });

    it("checkSlpTransaction - returns error on missing inputs or outputs", async () => {
        const txnBuf = Buffer.from("00000000000000000000", "hex");
        try {
            await grpc.checkSlpTransaction({txnBuf});
        } catch (err) {
            assert.strictEqual(err.message.includes("transaction is missing inputs or outputs"), true);
            return;
        }
        throw Error("transaction was not rejected");
    });

    it("getTokenMetadata for type 1 token w/ minting baton", async () => {
        const tokenID = Buffer.from("bb29e8a651a6cb0ac067b8d9b2f64c46eeb7921ab8a9b874a19703a910a370c7", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        // check minting baton txid & vout
        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getMintBatonHash_asU8().slice().reverse()).toString("hex"),
            "33e504ca8d11d4d928f6439729a05074cd50ac8ba8d43570d452eff203d840e4");
        assert.strictEqual(tm.getV1Fungible()!.getMintBatonVout(), 2);

        // check genesis properties
        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getTokenName()).toString("utf8"), "Fake USD");
        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getTokenTicker()).toString("utf8"), "USDF");
    });

    it("getTokenMetadata for NFT child token w/ group ID", async () => {
        const tokenID = Buffer.from("f8941855665c09ffb77b8b9e0af0f14a92782c1cc5560b33fe479fe64a19dfd5", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        // check minting baton txid & vout
        assert.strictEqual(Buffer.from(tm.getV1Nft1Child()!.getGroupId()).toString("hex"),
            "8501a019953ba16a20807a08a02d49a3441235132e4b2a14546c0bc2421a131e");

        // check genesis properties
        assert.strictEqual(Buffer.from(tm.getV1Nft1Child()!.getTokenName()).toString("utf8"), "sharp pointy sword");
        assert.strictEqual(Buffer.from(tm.getV1Nft1Child()!.getTokenTicker()).toString("utf8"), "");
    });

    it("getTokenMetadata for token with burned minting baton after Genesis", async () => {
        const tokenID = Buffer.from("9764efdb585963120faff71fbfc38c2eb8995af11e228587dc08d1f3c0c82157", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getMintBatonHash_asU8()).toString("hex"), "");
    });

    it("getTokenMetadata for token with burned minting baton after Mint", async () => {
        const tokenID = Buffer.from("c44029110ecc637a289b9da0e7ccad197788d0d82684a7607cbe2d5c13ce5b08", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getMintBatonHash_asU8()).toString("hex"), "");
    });

    it("getTokenMetadata for token with burned", async () => {
        const tokenID = Buffer.from("a17054f4cdb99fca43ad8ae218fd55c53814c02c450fb540a263edab5f1ac527", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.strictEqual(Buffer.from(tm.getV1Fungible()!.getMintBatonHash_asU8()).toString("hex"), "");
    });

    it("getAddressUnspentOutputs", async () => {
        const address = "qz5x4wy6vtkuc0z4m9yxf6lfej4sx44wdvxytgwfgp"; // "simpleledger:qz5x4wy6vtkuc0z4m9yxf6lfej4sx44wdvxytgwfgp"
        const res = await grpc.getAddressUtxos({address, includeMempool: true, includeTokenMetadata: true });
        res.getTokenMetadataList()
        const outs = res.getOutputsList()!;
        const tokens = res.getTokenMetadataList()!;
        const tokenIDs = new Set<string>();
        for (const out of outs) {
            if (out.getSlpToken()) {
                tokenIDs.add(Buffer.from(out.getSlpToken()!.getTokenId_asU8()).toString("hex"));
                const _tokenMetadata = tokens.find((t) =>
                    Buffer.from(t.getTokenId_asU8()).toString("hex") === Buffer.from(out.getSlpToken()!.getTokenId_asU8()).toString("hex"));
                if (! _tokenMetadata) {
                    throw Error("missing token id");
                }
                //console.log(`token id: ${Buffer.from(_token.getTokenId_asU8()).toString("hex")}`);
                let divisibility: number;
                if (_tokenMetadata.hasV1Fungible()) {
                    divisibility = _tokenMetadata.getV1Fungible()!.getDecimals();
                } else if (_tokenMetadata.hasV1Nft1Group()) {
                    divisibility = _tokenMetadata.getV1Nft1Group()!.getDecimals();
                } else if (_tokenMetadata.hasV1Nft1Child()) {
                    divisibility = 0;
                } else {
                    throw Error("unknown error");
                }

                const _token = out.getSlpToken()!;
                assert.ok(_token.getAddress() === address);
            }
        }

        // check all token IDs are represented in "TokenMetadataList"
        assert.strictEqual(tokenIDs.size, tokens.length);
    });

    it("getUnspentOutput returns slp mempool item", async () => {
        const txid = "ff7f98a8234cd6d0a5a8372331269a1bd9a42038aba5f01701e274ec33b1aa7e";
        let error: any;
        let res: GetUnspentOutputResponse;
        try {
            res = await grpc.getUnspentOutput({
                hash: txid,
                vout: 1,
                reversedHashOrder: true,
                includeMempool: true,
                includeTokenMetadata: true,
            });
        } catch (err) {
            error = err;
        }
        if (error) {
            assert.strictEqual(["5 NOT_FOUND: utxo spent in mempool", "5 NOT_FOUND: utxo not found"].includes(error.message), true);
        } else {
            throw Error("did not throw and expected error.");
        }
    });

    it("getRawTransaction returns the transaction (README example)", async () => {
        const txid = "11556da6ee3cb1d14727b3a8f4b37093b6fecd2bc7d577a02b4e98b7be58a7e8";
        const res = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        assert.strictEqual(res.getTransaction_asU8().length, 441);
    });

    it("getBlockInfo for index 0", async () => {
        const info = await grpc.getBlockInfo({index: 0});
        assert.strictEqual(info.getInfo()!.getHeight(), 0);
        const hash = Buffer.from(info.getInfo()!.getHash_asU8().reverse()).toString("hex");
        assert.strictEqual(hash, "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
    });

    it("getAddressTransactions for an example address", async function() {
        this.timeout(5000);
        const exampleAddress = "simpleledger:qregyd3kcklc58fd6r8epfwulpvd9f4mr5yarux86q";
        const firstTxid = "5248906d6ac8425f287727797307d7305291f57d30406cb627e6573bbb77a344";
        const res = await grpc.getAddressTransactions({address: exampleAddress, height: 0});
        const txns = res.getConfirmedTransactionsList();
        assert.strictEqual(txns.length >= 3, true);
        const tx1 = txns.filter((t) => Buffer.from(t.getHash_asU8().reverse()).toString("hex") === firstTxid)[0];
        assert.strictEqual(Buffer.from(tx1.getHash() as Uint8Array).toString("hex"), firstTxid);

        // check input values
        assert.strictEqual(tx1.getInputsList()[0].getAddress(), "qpesnqmhls2c8gz2fyqpczx4xy0weu6765p2sp2zfc");
        assert.strictEqual(tx1.getInputsList()[0].getValue(), 0.00013961 * 10 ** 8);
        assert.strictEqual(tx1.getInputsList()[1].getAddress(), "qr0e8sue6xynzucysjjjq6ms5vpj0zpgnyqhalegx4");
        assert.strictEqual(tx1.getInputsList()[2].getAddress(), "qq3af8yet2vrdl562mt499f28pm3f3x0t5s5ekgv20");

        // check output value
        assert.strictEqual(tx1.getOutputsList()[0].getValue(), 0.00035283 * 10 ** 8);
        assert.strictEqual(tx1.getOutputsList()[0].getAddress(), "qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7");
    });

    it("getAddressTransactions for an example address with slp", async function() {
        this.timeout(30000);
        const exampleAddress = "simpleledger:qzlvewdrrv2as4naam7wd8nxzlfp5ra0lsg9qp52ha";
        const firstTxid = "06d1bfcbd9832eafff1d448072f835242a8f1ae442189effe86abe6884c59f2b";
        const res = await grpc.getAddressTransactions({address: exampleAddress, height: 0});
        const txns = res.getConfirmedTransactionsList();
        assert.strictEqual(txns.length >= 3, true);
        const tx1 = txns.filter((t) => Buffer.from(t.getHash_asU8().reverse()).toString("hex") === firstTxid)[0];
        assert.strictEqual(Buffer.from(tx1.getHash() as Uint8Array).toString("hex"), firstTxid);

        // check input values
        assert.strictEqual(tx1.getInputsList()[0].getAddress(), "qrd24p8lh6w8tpcddedwwhafammhtrn6tskhn8cp6x");
        assert.strictEqual(tx1.getInputsList()[0].getValue(), 546);
        assert.strictEqual(tx1.getInputsList()[0].getSlpToken()!.getAddress(), "qrd24p8lh6w8tpcddedwwhafammhtrn6ts6vcudpyc");

        // check output value
        assert.strictEqual(tx1.getOutputsList()[0].getValue(), 0);
        assert.strictEqual(tx1.getOutputsList()[0].getAddress(), "");
        assert.strictEqual(tx1.getOutputsList()[1].getValue(), 0.00000546 * 10 ** 8);
        assert.strictEqual(tx1.getOutputsList()[1].getAddress(), "qzlvewdrrv2as4naam7wd8nxzlfp5ra0lsy7t6p2fr");
        assert.strictEqual(tx1.getOutputsList()[1].getSlpToken()!.getAddress(), "qzlvewdrrv2as4naam7wd8nxzlfp5ra0lsg9qp52ha");
    });

    it("submitTransaction should broadcast", async () => {
        const txnHex = "010000000552df9fd3f9bf1f13993e8b7e5b42530394ed644f0df4c0fdd32cf531acc75505030000006a47304402201039b25fa81feb74d8dd0eb25ae065e8baf3c944d7728f77fb68fa0c9b67d2c2022013f0bc158946826791c58dcd5187da1b2dfb3dd36227880e6d3830fe91327ea7c1210383c67be45a2bef59274c29341dd55592973d0b0f14c7810a353fbdff62f613defeffffff34e29914bd556e3a3818342ceff2ae526ef96bf3c3d09777df9f655be52931cf100300006a473044022034070971b4a27f279560a2f8b735ee3324d0dea54999bc24f851a7c6d500a1a102200b09402cf061a15f8ec88f606d8a864f9cc0e86c50ea78c9ce282337bdce19af4121020414832a8304904eec02ae00997ece267f234908d06633d75a8a4e1e4350e172ffffffff34e29914bd556e3a3818342ceff2ae526ef96bf3c3d09777df9f655be52931cf0f0300006a473044022071c84830f0da6abf35f93abebf2a8f3415cbeb3e9d967321a6944bbb6b6ec6aa022006bbfd5019fbc3d516dea6dde5f1d78c4e5428e6f305f00964efde70490ed2374121020414832a8304904eec02ae00997ece267f234908d06633d75a8a4e1e4350e172ffffffff34e29914bd556e3a3818342ceff2ae526ef96bf3c3d09777df9f655be52931cf0e0300006b483045022100ba0e0e300047c23f0e1bf5b83c240f8ad8da99c8021177b75329e30432953855022024d7ddffe1b8ad31d6f0a7955d7ae4d915ab40b31c367f9ed6e0400bc9ba69a94121020414832a8304904eec02ae00997ece267f234908d06633d75a8a4e1e4350e172ffffffff34e29914bd556e3a3818342ceff2ae526ef96bf3c3d09777df9f655be52931cf0d0300006b4830450221009d35b7f99e55486d4d5ee7208dc4c34c157e68f55a4fc7b7765c86b8d9af296f022058d754701593829d0ed4a5ea8881737ae185c7ead271b748e4eb76b92386261d4121020414832a8304904eec02ae00997ece267f234908d06633d75a8a4e1e4350e172ffffffff040000000000000000496a04534c500001010453454e4420c4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca47908000000000000000108000000000000000408000000000000005a22020000000000001976a914d20919767967b6305778ef2c8680e1bab9f9070588ac22020000000000001976a914750689c893d2b2a0e805b8b356283126d7d1e5c088ac22020000000000001976a9149af63d01b056c5b3e0a1d6f74e46ba0543a579bd88ac00000000";
        let error: any;
        try {
            await grpc.submitTransaction({txnHex, skipSlpValidityChecks: true});
        } catch (err) {
            error = err;
        }
        if (error) {
            assert.strictEqual(error.message, "3 INVALID_ARGUMENT: tx rejected: transaction already exists");
        } else {
            throw Error("did not throw and expected error.");
        }
    });

    it("getUnspentOutput throws if spent", async () => {
        const txid = "5248906d6ac8425f287727797307d7305291f57d30406cb627e6573bbb77a344";
        let error: any;
        try {
            await grpc.getUnspentOutput({hash: txid, vout: 0, reversedHashOrder: true, includeMempool: true });
        } catch (err) {
            error = err;
        }
        if (error) {
            assert.strictEqual(["5 NOT_FOUND: utxo spent in mempool", "5 NOT_FOUND: utxo not found"].includes(error.message), true);
        } else {
            throw Error("did not throw and expected error.");
        }
    });

    it("getParsedSlpScript - MINT 100", async () => {
        const script = Buffer.from("6a04534c50000101044d494e5420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4c00080000000000000064", "hex");
        const resp = await grpc.getParsedSlpScript(script);
        const tokenID = Buffer.from(resp.getTokenId());
        assert.strictEqual(resp.getV1Mint()!.getMintAmount(), "100");
        assert.strictEqual(tokenID.toString("hex"), "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    });

    describe("getParsedSlpScript - SLP Message Unit Tests", () => {
        for (const test of scriptUnitTestData) {
            it(test.msg, async () => {
                const script = Buffer.from(test.script, "hex");
                const eCode = test.code;
                if (eCode) {
                    let resp: GetParsedSlpScriptResponse;
                    try {
                        resp = await grpc.getParsedSlpScript(script);
                    } catch (error) {
                        console.log(error.message);
                        process.exit();
                    }
                    const parsingError = resp.getParsingError();
                    if (parsingError) {
                        // console.log(parsingError);
                        // console.log(expectedParsingErrorsFromGoSlp.get(parsingError));
                        if (expectedParsingErrorsFromGoSlp.has(parsingError)) {
                            assert.strictEqual(expectedParsingErrorsFromGoSlp.get(parsingError)!.includes(test.msg), true);
                        } else if (parsingError.includes("Unsupported token type:")) {
                            assert.strictEqual(parsingError.includes("Unsupported token type:"), true);
                        } else {
                            throw Error("Test is missing error type: " + parsingError);
                        }
                    } else {
                        throw Error("BCHD did not return a parsing error");
                    }
                } else {
                    const resp = await grpc.getParsedSlpScript(script);
                    const parsedType = resp.getSlpAction();
                    assert.strictEqual(parsedType > 0, true);
                }
            });
        }
    });

    it("trusted validation returns validity info", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "d2b81f055c8b0975c034ca16feaa7acaaae05da89463af81961d178cc2e56200", vout: 1, validAmt: 17600000000, tokenIDHex: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798" },   // valid SLP send amt
            { hash: "03280743b4cb057bbbdb8f460a62ca4f6de404c9b2efdfdd4b5f986357a2a657", vout: 1, validAmt: 200000000, tokenIDHex: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798" },     // valid SLP mint amt
            { hash: "f1bf99cfdd5d056de503350c9f6cabc3cd052d3dcaab7764708dc78145682bc4", vout: 1, validAmt: 100, tokenIDHex: "f1bf99cfdd5d056de503350c9f6cabc3cd052d3dcaab7764708dc78145682bc4" },                     // valid SLP genesis amt
            { hash: "03280743b4cb057bbbdb8f460a62ca4f6de404c9b2efdfdd4b5f986357a2a657", vout: 2, validAmt: "MINT_BATON", tokenIDHex: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798" },          // slp mint transaction, but targeting the mint baton output
            { hash: "f1bf99cfdd5d056de503350c9f6cabc3cd052d3dcaab7764708dc78145682bc4", vout: 2, validAmt: "MINT_BATON", tokenIDHex: "f1bf99cfdd5d056de503350c9f6cabc3cd052d3dcaab7764708dc78145682bc4" },          // slp genesis transaction, but targeting the mint baton output
        ];

        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            throw err;
        }
        const results = resp.getResultsList();
        if (results.length !== expected.length) {
            throw Error("missing results from trusted validator");
        }
        for (const res of results) {
            const exp = expected.find((i) => {
                return i.hash === Buffer.from(res.getPrevOutHash_asU8()).reverse().toString("hex") &&
                        i.vout === res.getPrevOutVout();
            });
            if (! exp) {
                throw Error("cannot find an expected result for the returned response!");
            }
            assert.strictEqual(exp.tokenIDHex, Buffer.from(res.getTokenId_asU8()).toString("hex"));
            const resultType = res.getValidityResultTypeCase();
            switch (resultType) {
                case GetTrustedSlpValidationResponse.ValidityResult.ValidityResultTypeCase.V1_MINT_BATON:
                    assert.strictEqual(res.getV1TokenAmount(), "0");
                    assert.strictEqual(res.getV1MintBaton(), exp.validAmt === "MINT_BATON");
                    break;
                case GetTrustedSlpValidationResponse.ValidityResult.ValidityResultTypeCase.V1_TOKEN_AMOUNT:
                    assert.strictEqual(res.getV1TokenAmount(), exp.validAmt.toString());
                    break;
                default:
                    throw Error("result type is unknown");
            }
        }
    });

    it("trusted validation throws if 'invalid txn hash'", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "00", vout: 1, validAmt: 0, tokenIDHex: "" },
        ];
        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("invalid txn hash"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws if 'txid is missing from slp validity set'", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "e5459585b8f5df1e115b47f3ac72cff256cdb75e3bb69735a906d58c3ceb1631", vout: 1, validAmt: 0, tokenIDHex: "" },
        ];
        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("txid is missing from slp validity set"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws if 'slp output index cannot be 0 or > 19'", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "32c265ecc608e83f41082e4514c08ce5b748edd80e68817aa3a385994c931354", vout: 20, validAmt: 0, tokenIDHex: "" },
        ];
        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("slp output index cannot be 0 or > 19"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws if 'vout is not a valid SLP output' for MINT", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "9582c0fdb41f82c74f3ef25a87963e510c3e981dde6f069e5d6a8cd4a643ce2b", vout: 3, validAmt: 0, tokenIDHex: "" },
        ];

        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("vout is not a valid slp output"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws if 'vout is not a valid SLP output' for SEND", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "a69ef2d5bfe964dd0d17722b31419a0366d3613f2575a24f068e806ab3a4a131", vout: 3, validAmt: 0, tokenIDHex: "" },
        ];

        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("vout is not a valid slp output"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws if 'vout is not a valid SLP output' for GENESIS", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "f1bf99cfdd5d056de503350c9f6cabc3cd052d3dcaab7764708dc78145682bc4", vout: 3, validAmt: 0, tokenIDHex: "" },
        ];

        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({ txos: expected, reversedHashOrder: true });
        } catch (err) {
            assert.strictEqual(err.message.includes("vout is not a valid slp output"), true);
            return;
        }
        throw Error("test did not throw");
    });

});

interface SlpMsgTest {
    msg: string;
    script: string;
    code: number;
}

const expectedParsingErrorsFromGoSlp = new Map<string, string[]>();
expectedParsingErrorsFromGoSlp.set("trailing data", [
    "Script ending mid-PUSH (one byte short) must be SLP-invalid",
    "Script ending mid-PUSH (no length) must be SLP-invalid",
    "Script ending mid-PUSH (length is one byte short) must be SLP-invalid",
    "(must be invalid: forbidden opcode): uses opcode OP_0",       // TODO: can we have a new GoSlp error for this, instead of "trailing data"
    "(must be invalid: forbidden opcode): uses opcode OP_1",       // TODO: can we have a new GoSlp error for this, instead of "trailing data"
    "(must be invalid: forbidden opcode): uses opcode OP_1NEGATE", // TODO: can we have a new GoSlp error for this, instead of "trailing data"
    "(must be invalid: forbidden opcode): uses opcode 0x50",       // TODO: can we have a new GoSlp error for this, instead of "trailing data"
]);

expectedParsingErrorsFromGoSlp.set("scriptpubkey not op_return", [
    "(not SLP): p2pkh address script",
]);
expectedParsingErrorsFromGoSlp.set("scriptpubkey too small", [
    "(must be invalid: too short): stopped after lokad ID",
    "(must be invalid: too short): stopped after token_type",
    "(not SLP): empty op_return",
    "(not SLP): first push is 4-byte '\\x00BET'",
]);
expectedParsingErrorsFromGoSlp.set("OP_RETURN magic is wrong size", [
    "(not SLP): first push is 9-byte 'yours.org'",
    "(not SLP): first push is 3-byte 'SLP'",
    "(not SLP): first push is 5-byte 'SLP\\x00\\x00'",
    "(not SLP): first push is 7-byte '\\xef\\xbb\\xbfSLP\\x00' (UTF8 byte order mark + 'SLP\\x00')",
]);
expectedParsingErrorsFromGoSlp.set("OP_RETURN magic is not in first chunk", [
    "(not SLP): first push is 4-byte '\\x00SLP'",
]);
expectedParsingErrorsFromGoSlp.set("token_type not token-type1, nft1-group, or nft1-child", [
    "(unsupported token type, must be token_type=1, 65, or 129): 2 bytes for token_type=2",
]);
expectedParsingErrorsFromGoSlp.set("token_type string length must be 1 or 2", [
    "(must be invalid: wrong size): 3 bytes for token_type",
    "(must be invalid: wrong size): 0 bytes for token_type",
]);
expectedParsingErrorsFromGoSlp.set("wrong number of chunks", [
    "(must be invalid: too short): stopped after transaction_type GENESIS",
    "(must be invalid: too short): stopped after transaction_type MINT",
    "(must be invalid: too short): stopped after transaction_type SEND",
    "(must be invalid: wrong number of params) GENESIS with extra token amount",
    "(must be invalid: wrong number of params) MINT with extra token amount",
]);
expectedParsingErrorsFromGoSlp.set("unrecognized transaction type", [
    "(must be invalid: bad value): transaction_type null",
    "(must be invalid: bad value): transaction_type 'INIT'",
    "(must be invalid: bad value): transaction_type 'TRAN'",
    "(must be invalid: bad value): transaction_type 'send'",
    "(must be invalid: bad value): transaction_type 'SENÄ'",
    "(must be invalid: bad value): transaction_type = 7-byte '\\xef\\xbb\\xbfSEND' (UTF8 byte order mark + 'SEND')",
    "(must be invalid: bad value): transaction_type = 7-byte 'ï»¿SEND' (UTF8 byte order mark + 'SEND')", // this is required since previous line is converted to this
    "(must be invalid: bad value): transaction_type = 10-byte UTF16 'SEND' (incl. BOM)",
    "(must be invalid: bad value): transaction_type = 20-byte UTF32 'SEND' (incl. BOM)",
]);
expectedParsingErrorsFromGoSlp.set("decimals string length must be 1", [
    "(must be invalid: wrong size): Genesis with 0-byte decimals",
    "(must be invalid: wrong size): Genesis with 2-byte decimals",
]);
expectedParsingErrorsFromGoSlp.set("documentHash string length must be 0 or 32", [
    "(must be invalid: wrong size): Genesis with 31-byte dochash",
    "(must be invalid: wrong size): Genesis with 33-byte dochash",
    "(must be invalid: wrong size): Genesis with 64-byte dochash",
    "(must be invalid: wrong size): Genesis with 20-byte dochash",
    "",
]);
expectedParsingErrorsFromGoSlp.set("tokenId invalid size", [
    "(must be invalid: wrong size): SEND with 0-byte token_id",
    "(must be invalid: wrong size): SEND with 31-byte token_id",
    "(must be invalid: wrong size): SEND with 33-byte token_id",
]);
expectedParsingErrorsFromGoSlp.set("tokenID invalid size", [
    "(must be invalid: wrong size): MINT with 0-byte token_id",
    "(must be invalid: wrong size): MINT with 31-byte token_id",
    "(must be invalid: wrong size): MINT with 33-byte token_id",
]);
expectedParsingErrorsFromGoSlp.set("amount string size not 8 bytes", [
    "(must be invalid: wrong size): SEND with a 7-byte amount",
    "(must be invalid: wrong size): SEND with a 9-byte amount",
    "(must be invalid: wrong size): SEND with a 0-byte amount",
    "",
]);
expectedParsingErrorsFromGoSlp.set("decimals bigger than 9", [
    "(must be invalid: bad value): Genesis with decimals=10",
]);
expectedParsingErrorsFromGoSlp.set("NFT1 child token must not have a minting baton", [
    "(must be invalid: bad value): NFT1 Child Genesis with mint_baton_vout!==null",
]);
expectedParsingErrorsFromGoSlp.set("NFT1 child token must have divisibility set to 0 decimal places", [
    "(must be invalid: bad value): NFT1 Child Genesis with divisibility!==0",
]);
expectedParsingErrorsFromGoSlp.set("NFT1 child token must have quantity of 1", [
    "(must be invalid: bad value): NFT1 Child Genesis with quanitity!==1",
]);
expectedParsingErrorsFromGoSlp.set("nft1 child cannot have mint transaction type", [
    "(must be invalid: impossible state): typical MINT without baton for token_type=41",
]);
expectedParsingErrorsFromGoSlp.set("mintBatonVout value must be at least 2", [
    "(must be invalid: bad value): Genesis with mint_baton_vout=1",
    "(must be invalid: bad value): Genesis with mint_baton_vout=0",
    "(must be invalid: bad value): MINT with mint_baton_vout=1",
    "(must be invalid: bad value): MINT with mint_baton_vout=0",
]);
expectedParsingErrorsFromGoSlp.set("token_amounts size is greater than 19", [
    "(must be invalid: too many parameters): SEND with 20 token output amounts",
]);
expectedParsingErrorsFromGoSlp.set("mint_baton_vout must be at least 2", [
    "(must be invalid: bad value): MINT with mint_baton_vout=1",
    "(must be invalid: bad value): MINT with mint_baton_vout=0",
]);
