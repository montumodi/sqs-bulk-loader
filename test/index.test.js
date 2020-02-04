const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {sendBatchedMessages, sendBatchedMessagesInParallel} = require("../src/index");

describe("Index file", () => {

  describe("When it is exported", () => {
    it("should expose methods", () => {
      expect(sendBatchedMessages).to.be.function();
      expect(sendBatchedMessagesInParallel).to.be.function();
    });
  });
});
