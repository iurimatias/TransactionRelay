var Client = {

  requestDeployment: function(fromAddress, code, runtimeCode, abi, tokenAddress, tokens) {
    var codeHash  = web3.sha3(runtimeCode, {encoding: 'hex'});
    var signature = web3.eth.sign(fromAddress, codeHash);

    var payload = {
      version: '0.0.1',
      from: fromAddress,
      signature: signature,
      token: tokenAddress,
      tokenNum: tokens,
      compiledCode: code,
      runtimeCode: runtimeCode,
      abi: abi
    };

    this.sendMsg(JSON.stringify(payload));
  },

  sendMsg: function(payload) {
    var identity = web3.shh.newIdentity();
    var topic = 'deployer01';

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
