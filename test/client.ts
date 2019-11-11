import assert from "assert";
import { GrpcClient } from "../src/client";

const grpc = new GrpcClient();

describe("grpc-bchrpc-node", () => {
    it("getBlockInfo for index 0", async () => {
        let info = await grpc.getBlockInfo({index: 0});
        assert.equal(info.getInfo()!.getHeight(), 0);
        let hash = Buffer.from(info.getInfo()!.getHash_asU8().reverse()).toString("hex");
        assert.equal(hash, "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
    });
});
