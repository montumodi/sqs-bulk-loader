const {chunk} = require("./chunk");
const batchPromises = require("batch-promises");

class BulkLoader {
  constructor(sqsClient, SendMessageBatchCommand) {
    this.sqsClient_ = sqsClient;
    this.sendMessageBatchCommand_ = SendMessageBatchCommand;
  }

  async sendBatchedMessages(queueUrl, messages) {
    const splittedArray = chunk(messages, 10);
    const responses = [];
    const params = {
      "QueueUrl": queueUrl
    };
    for (const messageArray of splittedArray) {
      params.Entries = messageArray;
      const command = new this.sendMessageBatchCommand_(params);
      // eslint-disable-next-line no-await-in-loop
      const response = await this.sqsClient_.send(command);
      responses.push(response);
    }
    return responses;
  }

  async sendBatchedMessagesInParallel(queueUrl, messages, options) {

    const defaultParams = {
      "batchSize": 10
    };
    const customOptions = Object.assign({}, defaultParams, options);

    const splittedArray = chunk(messages, 10);
    const responses = await batchPromises(customOptions.batchSize, splittedArray, messageArray => {
      const params = {
        "QueueUrl": queueUrl
      };
      params.Entries = messageArray;
      const command = new this.sendMessageBatchCommand_(params);
      return this.sqsClient_.send(command);
    });
    return responses;
  }
}

module.exports = BulkLoader;
