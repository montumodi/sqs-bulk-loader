const {chunk} = require("./chunk");
const batchPromises = require("batch-promises");

class BulkLoader {
  constructor(sqsClient) {
    this.sqsClient_ = sqsClient;
  }

  async sendBatchedMessages(queueUrl, messages) {
    const splittedArray = chunk(messages, 10);
    const responses = [];
    const params = {
      "QueueUrl": queueUrl
    };
    for (const messageArray of splittedArray) {
      params.Entries = messageArray;
      // eslint-disable-next-line no-await-in-loop
      const response = await this.sqsClient_.sendMessageBatch(params).promise();
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
      return this.sqsClient_.sendMessageBatch(params).promise();
    });
    return responses;
  }
}

module.exports = BulkLoader;
