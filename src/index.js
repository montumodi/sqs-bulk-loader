const aws = require("aws-sdk");
const BulkLoader = require("./bulkLoader");

function getSqsBulkUploader(client) {
  const sqsClient = client || new aws.SQS();
  const bulkLoader = new BulkLoader(sqsClient);

  return {
    "sendBatchedMessages": bulkLoader.sendBatchedMessages.bind(bulkLoader),
    "sendBatchedMessagesInParallel": bulkLoader.sendBatchedMessagesInParallel.bind(bulkLoader)
  };
}

module.exports = getSqsBulkUploader;

