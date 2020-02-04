const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const getSqsBulkLoader = require("../src/index");

describe("Index file", () => {

  describe("When getSqsBulkLoader is called without injecting client", () => {
    it("should expose methods", () => {
      const {sendBatchedMessages, sendBatchedMessagesInParallel} = getSqsBulkLoader();
      expect(sendBatchedMessages).to.be.function();
      expect(sendBatchedMessagesInParallel).to.be.function();
    });
  });

  describe("When getSqsBulkLoader is called with injecting client", () => {
    it("should expose methods", () => {
      const {sendBatchedMessages, sendBatchedMessagesInParallel} = getSqsBulkLoader({"dummy": "client"});
      expect(sendBatchedMessages).to.be.function();
      expect(sendBatchedMessagesInParallel).to.be.function();
    });
  });
});
