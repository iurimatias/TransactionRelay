var Deployer = {
  deployments: {},

  listenToDeployments: function() {
    DeployRelay.Deployed({from: web3.eth.accounts[0], deployedBy: web3.eth.accounts[0]}, 'latest').then(function(result) {
      console.log('deployed event');
      console.log(result);
    });
  },

  listenToReservations: function() {
    var self = this;
    DeployRelay.NewDeployment({_deployer: web3.eth.accounts[0]}, 'latest').then(function(event) {
      var id = event.args.deploymentId.toNumber();
      console.log("reservation confirmed: " + id);

      console.log("deploying");
      var codeHash = event.args._codeHash;
      var payload = self.deployments[codeHash];

      (new EmbarkJS.Contract({code: payload.compiledCode, abi: JSON.parse(payload.abi)})).deploy().then(function(deployedContract) {
        console.log("address is " + deployedContract.address);
        console.log([id, deployedContract.address, codeHash, {gas: 1200000}]);
        window.deployedContract = deployedContract;

        DeployRelay.confirmDeployment(id, deployedContract.address, codeHash, {gas: 1200000});
      });
    });
  },

  listenToRequests: function() {
    var self = this;

    var topic = 'deployer01';
    var options = {
      topics: [web3.fromAscii(topic)]
    };

    var filter = web3.shh.filter(options, function(err, result) {
      var payload = JSON.parse(web3.toAscii(result.payload));
      console.log("received");
      console.log(payload);

      var signature = payload.signature.slice(2);

      var r = signature.slice(0, 64);
      var s = signature.slice(64, 128);
      var v = signature.slice(128, 130);

      var codeHash = web3.sha3(payload.runtimeCode, {encoding: 'hex'});

      // TODO: temporary solution
      self.deployments[codeHash] = payload;

      DeployRelay.recoverAddress(codeHash, Number(v)+27, "0x"+r, "0x"+s).then(function(expectedAddress) {
        if (expectedAddress != payload.from) {
          console.log("invalid signature");
          return;
        }
        console.log("confirmed address");

        DeployRelay.reserveDeployment(web3.eth.accounts[0], codeHash, payload.token, payload.tokenNum, Number(v)+27, "0x" + r, "0x" + s, {gas: 1000000}).then(function(result) {
          console.log('reserve deployment done');
        }).catch(function(err) {
          alert("error: coudln't reserve deployment");
          console.log(err);
        });
      });
    });
  },

};
