class MockSQSClient {

  send(command) {
    return Promise.resolve(command.params.Entries);
  }
}

module.exports = MockSQSClient;
