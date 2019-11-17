import assert from "assert";
import { GrpcClient } from "../src/client";

const grpc = new GrpcClient();

describe("grpc-bchrpc-node", () => {
    it("getBlockInfo for index 0", async () => {
        const info = await grpc.getBlockInfo({index: 0});
        assert.equal(info.getInfo()!.getHeight(), 0);
        const hash = Buffer.from(info.getInfo()!.getHash_asU8().reverse()).toString("hex");
        assert.equal(hash, "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
    });

    it("getAddressTransactions for and example address", async () => {
        const exampleAddress = "bitcoincash:qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7";
        const firstTxid = "5248906d6ac8425f287727797307d7305291f57d30406cb627e6573bbb77a344";
        const res = await grpc.getAddressTransactions({address: exampleAddress});
        const txns = res.getConfirmedTransactionsList();
        assert.equal(txns.length >= 3, true);
        const tx1 = txns.filter(t => Buffer.from(t.getHash_asU8().reverse()).toString("hex") === firstTxid)[0];
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
});
