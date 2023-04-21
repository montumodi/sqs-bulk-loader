class MockSendMessageBatchCommand {

  constructor(params) {
    this.params_ = params;
  }

  get params() {
    return this.params_;
  }
}

module.exports = MockSendMessageBatchCommand;
