const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const sinon = require("sinon");
const tenMessages = require("./tenMessages");
const BulkLoader = require("../src/bulkLoader");
const {cloneDeep} = require("lodash");

const expectedParamsWithTenMessages = {
  "QueueUrl": "url",
  "Entries":
    [
      {"msg1": "val1"},
      {"msg2": "val2"},
      {"msg3": "val3"},
      {"msg4": "val4"},
      {"msg5": "val5"},
      {"msg6": "val6"},
      {"msg7": "val7"},
      {"msg8": "val8"},
      {"msg9": "val9"},
      {"msg10": "val10"}
    ]
};

describe("bulkSequence method", () => {

  describe("When called with 10 items", async () => {
    it("should return success", async () => {
      const mockClient = {
        "sendMessageBatch": sinon.stub().returns({"promise": () => "resolved"})
      };
      const bulkLoader = new BulkLoader(mockClient);
      const response = await bulkLoader.sendBatchedMessages("url", tenMessages);
      expect(response).to.equal(["resolved"]);
      expect(mockClient.sendMessageBatch.calledOnce).to.be.true();
      expect(mockClient.sendMessageBatch.calledWith(expectedParamsWithTenMessages)).to.be.true();
    });
  });

  describe("When called with more than 10 items", async () => {
    it("should return success", async () => {
      const moreThanTenItems = cloneDeep(tenMessages);
      moreThanTenItems.push({"msg11": "val11"});
      const mockClient = {
        "sendMessageBatch": sinon.stub().returns({"promise": () => "resolved"})
      };
      const bulkLoader = new BulkLoader(mockClient);
      const response = await bulkLoader.sendBatchedMessages("url", moreThanTenItems);
      expect(response).to.equal(["resolved", "resolved"]);
      expect(mockClient.sendMessageBatch.calledTwice).to.be.true();
      // expect(mockClient.sendMessageBatch.getCall(0).calledWith(expectedParamsWithTenMessages)).to.be.true();
      // expect(mockClient.sendMessageBatch.getCall(1).calledWith([{"QueueUrl": "url", "Entries": [{"msg11": "val11"}]}])).to.be.true();
    });
  });
});

describe("bulkParallel method", () => {

  describe("When called with 10 items", async () => {
    it("should return success", async () => {
      const mockClient = {
        "sendMessageBatch": sinon.stub().returns({"promise": () => "resolved"})
      };
      const bulkLoader = new BulkLoader(mockClient);
      const response = await bulkLoader.sendBatchedMessagesInParallel("url", tenMessages);
      expect(response).to.equal(["resolved"]);
      expect(mockClient.sendMessageBatch.calledOnce).to.be.true();
      expect(mockClient.sendMessageBatch.getCall(0).calledWith(expectedParamsWithTenMessages)).to.be.true();
    });
  });

  describe("When called with more than 10 items", async () => {
    it("should return success", async () => {
      const moreThanTenItems = cloneDeep(tenMessages);
      moreThanTenItems.push({"msg11": "val11"});
      const mockClient = {
        "sendMessageBatch": sinon.stub().returns({"promise": () => "resolved"})
      };
      const bulkLoader = new BulkLoader(mockClient);
      const response = await bulkLoader.sendBatchedMessagesInParallel("url", moreThanTenItems);
      expect(response).to.equal(["resolved", "resolved"]);
      expect(mockClient.sendMessageBatch.calledTwice).to.be.true();
      expect(mockClient.sendMessageBatch.getCall(0).calledWith(expectedParamsWithTenMessages)).to.be.true();
      expect(mockClient.sendMessageBatch.getCall(1).calledWith({"QueueUrl": "url", "Entries": [{"msg11": "val11"}]})).to.be.true();
    });
  });
});
