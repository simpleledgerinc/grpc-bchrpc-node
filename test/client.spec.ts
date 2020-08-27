import assert from "assert";
import Big from "big.js";
import { GetParsedSlpScriptResponse, GetTrustedSlpValidationRequest,
    GetTrustedSlpValidationResponse, GetUnspentOutputResponse } from "../pb/bchrpc_pb";
import { GrpcClient } from "../src/client";

const scriptUnitTestData: SlpMsgTest[] = require("slp-unit-test-data/script_tests.json");

const grpc = new GrpcClient({ url: "bchd.ny1.simpleledger.io", rootCertPath: "" });

describe("grpc-bchrpc-node", () => {

    it("getBlockchainInfo", async () => {
        const info = await grpc.getBlockchainInfo();
        assert.equal(info.getSlpIndex(), true);
        assert.equal(info.getTxIndex(), true);
        assert.equal(info.getAddrIndex(), true);
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
                const amt = BigInt(slpToken.getAmount()!);
                assert.equal([139200347639, 433852691149408].includes(parseInt(slpToken.getAmount(), 10)), true);
                assert.equal(slpToken.getDecimals(), 8);
                totalAmtOut = totalAmtOut.add(slpToken.getAmount());

                // check slp addresses
                assert.equal([
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
                assert.equal(slpToken.getDecimals(), 8);
                totalAmtIn = totalAmtIn.add(slpToken.getAmount());
            }
        }

        // check inputs == output amount
        assert.equal(totalAmtIn.gt(0), true);
        assert.equal(totalAmtIn.cmp(totalAmtOut), 0);

        // check token metadata
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenName()!).toString("utf8"), "Spice");
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenTicker()).toString("utf8"), "SPICE");
        assert.equal(res.getTokenMetadata()!.getType1()!.getDecimals()!, 8);
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenDocumentUrl()).toString("utf8"), "spiceslp@gmail.com");
        assert.equal(Buffer.from(res.getTokenMetadata()!.getTokenId_asU8()!).toString("hex"), "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf");

        // verify current Mint baton txid / vout
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonTxid(), "");
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonVout(), 0);
    });

    it("getTransaction - max uint64 SlpToken", async () => {
        const txidHex = "a7b885eb3ea084c8ba87d045afe89e48e3e5555442aad0ec27fb342bc93f3702";
        const res = await grpc.getTransaction({ hash: txidHex, reversedHashOrder: true, includeTokenMetadata: true });

        // check slp token output data (CHECK BIG NUMBER CASE!!)
        const outputs = res.getTransaction()!.getOutputsList();
        let totalOut = Big(0);
        for (const out of outputs) {
            if (out.getSlpToken()) {
                assert.equal(Big(out.getSlpToken()!.getAmount()).cmp("18446744073709551615"), 0);
                totalOut = totalOut.add(out.getSlpToken()!.getAmount());
            }
        }

        assert.equal(totalOut.cmp(Big("18446744073709551615")), 0);

        // verify Mint baton txid / vout
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonTxid(), "");
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonVout(), 0);
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
                assert.equal([133333333, 0].includes(parseInt(slpToken.getAmount(), 10)), true);
                assert.equal(slpToken.getDecimals(), 6);
                totalAmtOut = totalAmtOut.add(slpToken.getAmount());

                // check slp addresses
                assert.equal([
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
                assert.equal(slpToken.getDecimals(), 6);
                totalAmtIn = totalAmtIn.add(slpToken.getAmount());
            }
        }

        // check inputs == output amount
        assert.equal(totalAmtIn.eq(0), true);
        assert.equal(totalAmtIn.lt(totalAmtOut), true);

        // check token metadata
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenName()!).toString("utf8"), "Mistcoin");
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenTicker()).toString("utf8"), "MIST");
        assert.equal(res.getTokenMetadata()!.getType1()!.getDecimals()!, 6);
        assert.equal(Buffer.from(res.getTokenMetadata()!.getType1()!.getTokenDocumentUrl()).toString("utf8"), "https://mistcoin.org");
        assert.equal(Buffer.from(res.getTokenMetadata()!.getTokenId_asU8()!).toString("hex"), "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798");

        // verify current Mint baton txid / vout
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonTxid().length === 32, true);
        assert.equal(res.getTokenMetadata()!.getType1()!.getMintBatonVout(), 2);
    });

    it("checkSlpTransaction - returns error on missing inputs or outputs", async () => {
        const txnBuf = Buffer.from("00000000000000000000", "hex");
        try {
            await grpc.checkSlpTransaction({txnBuf});
        } catch (err) {
            assert.equal(err.message.includes("transaction is missing inputs or outputs"), true);
            return;
        }
        throw Error("transaction was not rejected");
    });

    it("getTokenMetadata for type 1 token w/ minting baton", async () => {
        const tokenID = Buffer.from("bb29e8a651a6cb0ac067b8d9b2f64c46eeb7921ab8a9b874a19703a910a370c7", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        // check minting baton txid & vout
        assert.equal(Buffer.from(tm.getType1()!.getMintBatonTxid_asU8().slice().reverse()).toString("hex"),
            "33e504ca8d11d4d928f6439729a05074cd50ac8ba8d43570d452eff203d840e4");
        assert.equal(tm.getType1()!.getMintBatonVout(), 2);

        // check genesis properties
        assert.equal(Buffer.from(tm.getType1()!.getTokenName()).toString("utf8"), "Fake USD");
        assert.equal(Buffer.from(tm.getType1()!.getTokenTicker()).toString("utf8"), "USDF");
    });

    it("getTokenMetadata for NFT child token w/ group ID", async () => {
        const tokenID = Buffer.from("f8941855665c09ffb77b8b9e0af0f14a92782c1cc5560b33fe479fe64a19dfd5", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        // check minting baton txid & vout
        assert.equal(Buffer.from(tm.getNft1Child()!.getGroupId()).toString("hex"),
            "8501a019953ba16a20807a08a02d49a3441235132e4b2a14546c0bc2421a131e");

        // check genesis properties
        assert.equal(Buffer.from(tm.getNft1Child()!.getTokenName()).toString("utf8"), "sharp pointy sword");
        assert.equal(Buffer.from(tm.getNft1Child()!.getTokenTicker()).toString("utf8"), "");
    });

    it("getTokenMetadata for token with burned minting baton after Genesis", async () => {
        const tokenID = Buffer.from("9764efdb585963120faff71fbfc38c2eb8995af11e228587dc08d1f3c0c82157", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.equal(Buffer.from(tm.getType1()!.getMintBatonTxid_asU8()).toString("hex"), "");
    });

    it("getTokenMetadata for token with burned minting baton after Mint", async () => {
        const tokenID = Buffer.from("c44029110ecc637a289b9da0e7ccad197788d0d82684a7607cbe2d5c13ce5b08", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.equal(Buffer.from(tm.getType1()!.getMintBatonTxid_asU8()).toString("hex"), "");
    });

    it("getTokenMetadata for token with burned", async () => {
        const tokenID = Buffer.from("a17054f4cdb99fca43ad8ae218fd55c53814c02c450fb540a263edab5f1ac527", "hex");
        const res = await grpc.getTokenMetadata([ tokenID ]);
        const tm = res.getTokenMetadataList()![0];

        assert.equal(Buffer.from(tm.getType1()!.getMintBatonTxid_asU8()).toString("hex"), "");
    });

    it("getAddressUnspentOutputs", async () => {
        const address = "bitcoincash:qz5x4wy6vtkuc0z4m9yxf6lfej4sx44wdv2lqnmfkl";
        const res = await grpc.getAddressUtxos({address, includeMempool: true, includeTokenMetadata: true });
        const outs = res.getOutputsList()!;
        const tokens = res.getTokenMetadataList()!;
        const tokenIDs = new Set<string>();
        for (const out of outs) {
            if (out.getSlpToken()) {
                tokenIDs.add(Buffer.from(out.getSlpToken()!.getTokenId_asU8()).toString("hex"));
                const _token = tokens.find((t) =>
                    Buffer.from(t.getTokenId_asU8()).toString("hex") === Buffer.from(out.getSlpToken()!.getTokenId_asU8()).toString("hex"));
                if (! _token) {
                    throw Error("missing token id");
                }
                //console.log(`token id: ${Buffer.from(_token.getTokenId_asU8()).toString("hex")}`);
                let divisibility: number;
                if (_token.hasType1()) {
                    divisibility = _token.getType1()!.getDecimals();
                } else if (_token.hasNft1Group()) {
                    divisibility = _token.getNft1Group()!.getDecimals();
                } else if (_token.hasNft1Child()) {
                    divisibility = 0;
                } else {
                    throw Error("unknown error");
                }

                //console.log(`token amt: ${Big(out.getSlpToken()!.getAmount()).div(10 ** divisibility)}`);
            }
        }

        // check all token IDs are represented in "TokenMetadataList"
        assert.equal(tokenIDs.size, tokens.length);
        
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
            assert.equal(["5 NOT_FOUND: utxo spent in mempool", "5 NOT_FOUND: utxo not found"].includes(error.message), true);
        } else {
            throw Error("did not throw and expected error.");
        }
    });

    it("getRawTransaction returns the transaction (README example)", async () => {
        const txid = "11556da6ee3cb1d14727b3a8f4b37093b6fecd2bc7d577a02b4e98b7be58a7e8";
        const res = await grpc.getRawTransaction({ hash: txid, reversedHashOrder: true });
        assert.equal(res.getTransaction_asU8().length, 441);
    });

    it("getBlockInfo for index 0", async () => {
        const info = await grpc.getBlockInfo({index: 0});
        assert.equal(info.getInfo()!.getHeight(), 0);
        const hash = Buffer.from(info.getInfo()!.getHash_asU8().reverse()).toString("hex");
        assert.equal(hash, "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
    });

    it("getAddressTransactions for and example address", async () => {
        const exampleAddress = "bitcoincash:qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7";
        const firstTxid = "5248906d6ac8425f287727797307d7305291f57d30406cb627e6573bbb77a344";
        const res = await grpc.getAddressTransactions({address: exampleAddress, height: 0});
        const txns = res.getConfirmedTransactionsList();
        assert.equal(txns.length >= 3, true);
        const tx1 = txns.filter((t) => Buffer.from(t.getHash_asU8().reverse()).toString("hex") === firstTxid)[0];
        assert.equal(Buffer.from(tx1.getHash() as Uint8Array).toString("hex"), firstTxid);

        // check input values
        assert.equal(tx1.getInputsList()[0].getAddress(), "qpesnqmhls2c8gz2fyqpczx4xy0weu6765p2sp2zfc");
        assert.equal(tx1.getInputsList()[0].getValue(), 0.00013961 * 10 ** 8);
        assert.equal(tx1.getInputsList()[1].getAddress(), "qr0e8sue6xynzucysjjjq6ms5vpj0zpgnyqhalegx4");
        assert.equal(tx1.getInputsList()[2].getAddress(), "qq3af8yet2vrdl562mt499f28pm3f3x0t5s5ekgv20");

        // check output value
        assert.equal(tx1.getOutputsList()[0].getValue(), 0.00035283 * 10 ** 8);
        assert.equal(tx1.getOutputsList()[0].getAddress(), "qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7");
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
            assert.equal(error.message, "3 INVALID_ARGUMENT: tx rejected: transaction already exists");
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
            assert.equal(["5 NOT_FOUND: utxo spent in mempool", "5 NOT_FOUND: utxo not found"].includes(error.message), true);
        } else {
            throw Error("did not throw and expected error.");
        }
    });

    // TODO ... getTokenMetadata is not yet implemented in BCHD
    // it("getTokenMetadata", async () => {
    //     const tokenId = "";
    //     await grpc.getTokenMetadata([tokenId]);
    //     assert.equal("", "");
    // });

    it("getParsedSlpScript - MINT 100", async () => {
        const script = Buffer.from("6a04534c50000101044d494e5420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4c00080000000000000064", "hex");
        const resp = await grpc.getParsedSlpScript(script);
        const tokenID = Buffer.from(resp.getTokenId());
        assert.equal(resp.getV1Mint()!.getMintAmount(), 100);
        assert.equal(tokenID.toString("hex"), "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
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

                        if (expectedParsingErrorsFromGoSlp.has(parsingError)) {
                            assert.equal(expectedParsingErrorsFromGoSlp.get(parsingError)!.includes(test.msg), true);
                        } else if (parsingError.includes("Unsupported token type:")) {
                            assert.equal(parsingError.includes("Unsupported token type:"), true);
                        } else {
                            throw Error("Test is missing error type: " + parsingError);
                        }
                    } else {
                        throw Error("BCHD did not return a parsing error");
                    }
                } else {
                    const resp = await grpc.getParsedSlpScript(script);
                    const parsedType = resp.getType();
                    assert.equal(parsedType > 0, true);
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
            assert.equal(exp.tokenIDHex, Buffer.from(res.getTokenId_asU8()).toString("hex"));
            const resultType = res.getValidityResultTypeCase();
            switch (resultType) {
                case GetTrustedSlpValidationResponse.ValidityResult.ValidityResultTypeCase.V1_MINT_BATON:
                    assert.equal(res.getV1TokenAmount(), 0);
                    assert.equal(res.getV1MintBaton(), exp.validAmt === "MINT_BATON");
                    break;
                case GetTrustedSlpValidationResponse.ValidityResult.ValidityResultTypeCase.V1_TOKEN_AMOUNT:
                    assert.equal(res.getV1TokenAmount(), exp.validAmt);
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
            assert.equal(err.message.includes("invalid txn hash"), true);
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
            assert.equal(err.message.includes("txid is missing from slp validity set"), true);
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
            assert.equal(err.message.includes("slp output index cannot be 0 or > 19"), true);
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
            assert.equal(err.message.includes("vout is not a valid SLP output"), true);
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
            assert.equal(err.message.includes("vout is not a valid SLP output"), true);
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
            assert.equal(err.message.includes("vout is not a valid SLP output"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("trusted validation throws on functionary request when not configured", async () => {
        const expected: Array<{hash: string; vout: number; validAmt: number|string; tokenIDHex: string}> = [
            { hash: "d2b81f055c8b0975c034ca16feaa7acaaae05da89463af81961d178cc2e56200", vout: 1, validAmt: 17600000000, tokenIDHex: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798" },
        ];

        let resp: GetTrustedSlpValidationResponse;
        try {
            resp = await grpc.getTrustedSlpValidation({
                functionaryInfo: {
                    pubKey: "00",
                    type: GetTrustedSlpValidationRequest.Functionary.MessageType.STANDARD,
                    sigType: GetTrustedSlpValidationRequest.Functionary.SignatureType.SECP256K1_SCHNORR,
                },
                reversedHashOrder: true,
                txos: expected,
            });
        } catch (err) {
            //console.log(err.message);
            assert.equal(err.message.includes("slp validation functionary not implemented"), true);
            return;
        }
        throw Error("test did not throw");
    });

    it("getBip44Address", async () => {
        const res = await grpc.getBip44HdAddress({
            xpub: "xpub6CnNNTEFauNBS6TDWzEcWqXU1DXN5BU3Q165QKWYnaPNQcm6Y8NzoRjZNMRCcayDgx4BTVxTCYDWDYNfX8ej1WiCDWB9vBUJ8BFSzQbhATC",
            isChange: false,
            addressIndex: 0,
        });

        assert.equal(res.getCashAddr(), "bitcoincash:qrlk9amfej0dj8n4pm58uf7awl2c5lsd5uf2n9muex");
        assert.equal(res.getSlpAddr(), "simpleledger:qrlk9amfej0dj8n4pm58uf7awl2c5lsd5u93c7wu8c");
        assert.equal(Buffer.from(res.getPubKey_asU8()).toString("hex"), "02990538a53c000f1da9d34634746765eb3fa6ca450cfbea13300f0df1aef8e00e");
    });

    it("getBip44Address", async () => {
        const res = await grpc.getBip44HdAddress({
            xpub: "xpub6CnNNTEFauNBS6TDWzEcWqXU1DXN5BU3Q165QKWYnaPNQcm6Y8NzoRjZNMRCcayDgx4BTVxTCYDWDYNfX8ej1WiCDWB9vBUJ8BFSzQbhATC",
            isChange: false,
            addressIndex: 1,
        });

        assert.equal(res.getCashAddr(), "bitcoincash:qq29mq80662z00gss7tmrt8y2nfawfmx45gj3yqfqy");
        assert.equal(res.getSlpAddr(), "simpleledger:qq29mq80662z00gss7tmrt8y2nfawfmx45yf6l4f76");
        assert.equal(Buffer.from(res.getPubKey_asU8()).toString("hex"), "023f62244d3e050eb8018fcf73f4ea7c8a6b7a8f01e0afaa585b9c1c3d5cdf6775");
    });

    it("getBip44Address", async () => {
        const res = await grpc.getBip44HdAddress({
            xpub: "xpub6CnNNTEFauNBS6TDWzEcWqXU1DXN5BU3Q165QKWYnaPNQcm6Y8NzoRjZNMRCcayDgx4BTVxTCYDWDYNfX8ej1WiCDWB9vBUJ8BFSzQbhATC",
            isChange: true,
            addressIndex: 1,
        });

        assert.equal(res.getCashAddr(), "bitcoincash:qz0s5gngtrmwcp9pwfpp4dzzr5a7e6pt9ypmvpvrlf");
        assert.equal(res.getSlpAddr(), "simpleledger:qz0s5gngtrmwcp9pwfpp4dzzr5a7e6pt9ydq86erph");
        assert.equal(Buffer.from(res.getPubKey_asU8()).toString("hex"), "0289e06414948c7d044ed7b3f09cb8a9a2709f629d9fdbd642033ca3725731a2a2");
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
expectedParsingErrorsFromGoSlp.set("lokad id wrong size", [
    "(not SLP): first push is 9-byte 'yours.org'",
    "(not SLP): first push is 3-byte 'SLP'",
    "(not SLP): first push is 5-byte 'SLP\\x00\\x00'",
    "(not SLP): first push is 7-byte '\\xef\\xbb\\xbfSLP\\x00' (UTF8 byte order mark + 'SLP\\x00')",
]);
expectedParsingErrorsFromGoSlp.set("SLP not in first chunk", [
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
expectedParsingErrorsFromGoSlp.set("impossible parsing result", [
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
expectedParsingErrorsFromGoSlp.set("documentHash must be size 0 or 32", [
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
expectedParsingErrorsFromGoSlp.set("decimals biger than 9", [
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
expectedParsingErrorsFromGoSlp.set("NFT1 Child cannot have MINT transaction type.", [
    "(must be invalid: impossible state): typical MINT without baton for token_type=41",
]);
expectedParsingErrorsFromGoSlp.set("mintBatonVout must be at least 2", [
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
