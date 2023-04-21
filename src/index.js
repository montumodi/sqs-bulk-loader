const {SQSClient, SendMessageBatchCommand} = require("@aws-sdk/client-sqs");
const BulkLoader = require("./bulkLoader");

function getSqsBulkUploader(client) {
  const sqsClient = client || new SQSClient();
  const bulkLoader = new BulkLoader(sqsClient, SendMessageBatchCommand);

  return {
    "sendBatchedMessages": bulkLoader.sendBatchedMessages.bind(bulkLoader),
    "sendBatchedMessagesInParallel": bulkLoader.sendBatchedMessagesInParallel.bind(bulkLoader)
  };
}

module.exports = getSqsBulkUploader;

