const aws = require("aws-sdk");
const BulkLoader = require("./bulkLoader");

const sqsClient = new aws.SQS();
const bulkLoader = new BulkLoader(sqsClient);

module.exports = {
  "sendBatchedMessages": bulkLoader.sendBatchedMessages.bind(bulkLoader),
  "sendBatchedMessagesInParallel": bulkLoader.sendBatchedMessagesInParallel.bind(bulkLoader)
};

