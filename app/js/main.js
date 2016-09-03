$(document).ready(function() {

  // TODO: add ui to approve tokens
  Token.approve(DeployRelay.address, 1000);

  $(".submitCode").click(function() {
    var code = $(".code").val();
    var runtimeCode = $(".runtime").val();
    var abi =  $(".abi").val();
    var tokens =  $(".abi").val();

    Client.requestDeplyoment(web3.eth.accounts[0], code, runtimeCode, abi, Number(tokens));
  });

  Deployer.listenToRequests();
  Deployer.listenToDeployments();
  Deployer.listenToReservations();
});
