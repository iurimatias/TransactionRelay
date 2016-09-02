var Deployer = {
  listenToRequests: function() {
    var self = this;
    // handle requests
    var filter = web3.shh.filter(options, function(err, result) {
      //TODO: verify if signature is valid before attempting to deploy
      //TODO: verify if requester has authorized contract to withdraw funds

      var payload = web3.toAscii(result.payload).split('|||');
      console.log("received");
      console.log(payload);

      var from      = payload[0];
      var signature = payload[1];
      var tokens    = payload[2];
      // TODO: is this runtimecode? probably shouldn't be?
      var code      = payload[3];
      var abi       = JSON.parse(payload[4]);

      self.deployCode(from, code, abi), function(address) {
        console.log(arguments);
      });
    });
  },

  deployCode: function(from, code, abi, cb) {
    console.log(arguments);
    var self = this;
    var contractParams;

    contractParams = []; // no args supported for now

    contractParams.push({
      from: from,
      data: code,
      gasLimit: 1000000,
      gasPrice: 10000000000000
    });

    var contractObject = web3.eth.contract(abi);

    contractParams.push(function(err, transaction) {
      console.log(arguments);
      if (err) {
        console.log("error");
      } else if (transaction.address !== undefined) {
        console.log("address contract: " + transaction.address);
      }
    });

    contractObject["new"].apply(contractObject, contractParams);
  }
};
