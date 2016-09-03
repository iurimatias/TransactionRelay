$(document).ready(function() {

  // add ui to approve tokens
  //Token.approve(DeployRelay.address, 500)
  Token.approve(DeployRelay.address, 1000);

  $(".submitCode").click(function() {
    var code = $(".code").val();
    var runtimeCode = $(".runtime").val();
    var abi =  $(".abi").val();

    Client.requestDeplyoment(web3.eth.accounts[0], code, runtimeCode, abi);
  });

  Deployer.listenToRequests();
  Deployer.listenToDeployments();
});
