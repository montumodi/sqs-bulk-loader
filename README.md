# AWS SQS Bulk Loader

A set of functions to help sending bulk messages in sequence or parallel to AWS SQS.

[![Greenkeeper badge](https://badges.greenkeeper.io/montumodi/sqs-bulk-loader.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/montumodi/sqs-bulk-loader/badge.svg?branch=master)](https://coveralls.io/github/montumodi/sqs-bulk-loader?branch=master)
[![Build Status](https://travis-ci.com/montumodi/sqs-bulk-loader.svg?branch=master)](https://travis-ci.com/montumodi/sqs-bulk-loader)
[![Deps](https://david-dm.org/montumodi/sqs-bulk-loader.svg)](https://david-dm.org/montumodi/sqs-bulk-loader#info=dependencies)
[![devDependency Status](https://david-dm.org/montumodi/sqs-bulk-loader/dev-status.svg)](https://david-dm.org/montumodi/sqs-bulk-loader#info=devDependencies)

[![NPM](https://nodei.co/npm/sqs-bulk-loader.png?downloads=true)](https://www.npmjs.com/package/sqs-bulk-loader/)

## How to install

```
npm install sqs-bulk-loader
```

## Running the tests

`npm test`

### Getting started

Basic syntax is:

```js
const {sendBatchedMessages, sendBatchedMessagesInParallel} = require("sqs-bulk-loader")();

const messages = [
  {
    "Id": "1",
    "MessageBody": '{"key1": "value1"}'
  },
  {
    "Id": "2",
    "MessageBody": '{"key2": "value2"}'
  }
];

// this needs to be in async function
const response = await sendBatchedMessages("someQueueUrl", messages);
console.log(response)

// OR you can use normal promise style as well.
sendBatchedMessages("someQueueUrl", messages)
  .then(response => console.log(response));

```

In case you need to inject the `aws-sdk` with custom settings. It can be done like this

```js
const aws = require("aws-sdk");
const sqsClient = new aws.SQS();
const {sendBatchedMessages, sendBatchedMessagesInParallel} = require("sqs-bulk-loader")(sqsClient);
```

### API

### sendBatchedMessages

### sendBatchedMessages(queueUrl, messages) ⇒ <code>Promise</code>
Function - Sends the messages passed in batch of 10 sequentially

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queueUrl | <code>String</code> |  | SQS queue url |
| messages | <code>Array</code> |  | Array of messages as per `sendMessageBatch`'s params |

More details - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessageBatch-property

### sendBatchedMessagesInParallel

### sendBatchedMessagesInParallel(queueUrl, messages) ⇒ <code>Promise</code>
Function - Sends the messages passed in batch of 10 parallely

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queueUrl | <code>String</code> |  | SQS queue url |
| messages | <code>Array</code> |  | Array of messages as per `sendMessageBatch`'s params |
| [options] | <code>Object</code> | <code>{"batchSize": 10}</code> | Optional object containing extra properties which will be passed to function. Currently it supports `batchSize` integer to control how many parallel requests to spawn. Default is 10 |

More details - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessageBatch-property
