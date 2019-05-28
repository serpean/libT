class RequestStrategy {
  constructor() {
    this._request = null;
  }
  set request(request) {
    this._request = request;
  }
  get request() {
    return this._request;
  }
  doRequest(data) {
    return this._request.doRequest(data);
  }
}

module.exports = RequestStrategy;
