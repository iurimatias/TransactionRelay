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

  var sendMsg = function(payload) {
    var message = {
      from: identity,
      topics: [web3.fromAscii(topic)],
      payload: web3.fromAscii(payload),
      ttl: 100,
      priority: 1000
    };

    web3.shh.post(message);
    console.log('sent!');
  };

  console.log('done');

  a=VerifySignature.testECRecover(hash, Number(v)+27, "0x"+r, "0x"+s);
  console.log(a);

  $(".submitCode").click(function() {
    var code = $(".code").val();
    var abi =  $(".abi").val();
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

    sendMsg(payload.join("|||"));
  });

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

    deployCode(from, code, abi, function(address) {
      console.log(arguments);
    });
  });

  var deployCode = function(from, code, abi, cb) {
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
  };

});
