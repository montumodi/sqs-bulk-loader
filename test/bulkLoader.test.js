const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const tenMessages = require("./tenMessages");
const BulkLoader = require("../src/bulkLoader");
const {cloneDeep} = require("lodash");
const MockSQSClient = require("./mockSQSClient");
const MockSendMessageBatchCommand = require("./mockSendMessageBatchCommand");

describe("bulkSequence method", () => {

  describe("When called with 10 items", () => {
    it("should return success", async () => {
      const bulkLoader = new BulkLoader(new MockSQSClient(), MockSendMessageBatchCommand);
      const response = await bulkLoader.sendBatchedMessages("url", tenMessages);
      expect(response).to.equal([tenMessages]);
    });
  });

  describe("When called with more than 10 items", () => {
    it("should return success", async () => {
      const moreThanTenItems = cloneDeep(tenMessages);
      moreThanTenItems.push({"msg11": "val11"});
      const bulkLoader = new BulkLoader(new MockSQSClient(), MockSendMessageBatchCommand);
      const response = await bulkLoader.sendBatchedMessages("url", moreThanTenItems);
      expect(response).to.equal([tenMessages, [{"msg11": "val11"}]]);
    });
  });
});

describe("bulkParallel method", () => {

  describe("When called with 10 items", () => {
    it("should return success", async () => {
      const bulkLoader = new BulkLoader(new MockSQSClient(), MockSendMessageBatchCommand);
      const response = await bulkLoader.sendBatchedMessagesInParallel("url", tenMessages);
      expect(response).to.equal([tenMessages]);
    });
  });

  describe("When called with more than 10 items", () => {
    it("should return success", async () => {
      const moreThanTenItems = cloneDeep(tenMessages);
      moreThanTenItems.push({"msg11": "val11"});
      const bulkLoader = new BulkLoader(new MockSQSClient(), MockSendMessageBatchCommand);
      const response = await bulkLoader.sendBatchedMessagesInParallel("url", moreThanTenItems, {"batchSize": 2});
      expect(response).to.equal([tenMessages, [{"msg11": "val11"}]]);
    });
  });
});
