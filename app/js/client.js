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

    //this.sendMsg(JSON.stringify(payload));
    EmbarkJS.Messages.sendMessage({topic: 'deployer01', data: payload, ttl: 100, priority: 1000});
  }

};
