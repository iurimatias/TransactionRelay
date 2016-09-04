$(document).ready(function() {

  // TODO: add ui to approve tokens
  Token.approve(DeployRelay.address, 1000);
  $('.tokenAddress').val(Token.address);

  $(".submitCode").click(function() {
    var code = $(".code").val();
    var runtimeCode = $(".runtime").val();
    var abi =  $(".abi").val();
    var tokenAddress = $('.tokenAddress').val();
    var tokens =  $(".tokens").val();

    Client.requestDeployment(web3.eth.accounts[0], code, runtimeCode, abi, tokenAddress, Number(tokens));
  });

  Deployer.listenToRequests();
  Deployer.listenToDeployments();
  Deployer.listenToReservations();
});
