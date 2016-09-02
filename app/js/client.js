var Client = {
  requestDeplyoment: function(fromAddress, code, abi) {
    var payload = [];

    var signatureParams = [];
    signatureParams.push(web3.eth.accounts[0]);
    signatureParams.push(123); // replace with compiled code hash
    signatureParams = web3.sha3(signatureParams.join(','));

    var signature = web3.eth.sign(web3.eth.accounts[0], signatureParams);

    payload.push(web3.eth.accounts[0]);
    payload.push(signature);
    payload.push(100); // token price
    payload.push(code); // token price
    payload.push(abi); // token price

    this.sendMsg(payload.join("|||"));
  },

  sendMsg: function(payload) {
    var message = {
      from: identity,
      topics: [web3.fromAscii(topic)],
      payload: web3.fromAscii(payload),
      ttl: 100,
      priority: 1000
    };

    web3.shh.post(message);
    console.log('sent!');
  }
};
