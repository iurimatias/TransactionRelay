$(document).ready(function() {

  // whisper config
  var identity = web3.shh.newIdentity();
  var topic = 'example';
  var payload = 'hello whisper world!';
  options = {
    topics: [web3.fromAscii(topic)]
  };


  //a=web3.sha3(contractDB.Deployer.compiled.runtimeBytecode, {encoding: 'hex'})

  var hash = web3.sha3("hello I wrote this");
  var signature = web3.eth.sign(web3.eth.accounts[0], hash);
  signature = signature.slice(2);

  var r = signature.slice(0, 64);
  var s = signature.slice(64, 128);
  var v = signature.slice(128, 130);

  };

  console.log('done');

  a=VerifySignature.testECRecover(hash, Number(v)+27, "0x"+r, "0x"+s);
  console.log(a);

  $(".submitCode").click(function() {
    var code = $(".code").val();
    var abi =  $(".abi").val();

    Client.requestDeplyoment(web3.eth.accounts[0], code, abi);
  });

  Deployer.listenToRequests();

});
