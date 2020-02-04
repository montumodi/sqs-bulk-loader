const splitArray = require("split-array");

class BulkLoader {
  constructor(sqsClient) {
    this.sqsClient_ = sqsClient;
  }

  async sendBatchedMessages(queueUrl, messages) {
    const spilttedArray = splitArray(messages, 10);
    const responses = [];
    const params = {
      "QueueUrl": queueUrl
    };
    for (const messageArray of spilttedArray) {
      params.Entries = messageArray;
      // eslint-disable-next-line no-await-in-loop
      const response = await this.sqsClient_.sendMessageBatch(params).promise();
      responses.push(response);
    }
    return responses;
  }

  async sendBatchedMessagesInParallel(queueUrl, messages) {
    const spilttedArray = splitArray(messages, 10);
    const responses = await Promise.all(spilttedArray.map(messageArray => {
      const params = {
        "QueueUrl": queueUrl
      };
      params.Entries = messageArray;
      return this.sqsClient_.sendMessageBatch(params).promise();
    }));
    return responses;
  }
}

module.exports = BulkLoader;
