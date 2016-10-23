pragma solidity ^0.4.2;

contract TokenInterface {
  function transfer( address to, uint value) returns (bool ok);
  function transferFrom( address from, address to, uint value) returns (bool ok);
  function allowance(address owner, address spender) constant returns (uint _allowance);
}

contract DeployRelay {
  struct Deployment {
    address requester;
    address deployer;
    bytes32 codeHash;
    address token;
    uint fee;
    bool deployed;
  }
  uint256 public numDeployments;
  bool public something;

  mapping (uint256 => Deployment) public deployments;

  event NewDeployment(address indexed _deployer, bytes32 _codeHash, uint256 deploymentId);
  event Deployed(address indexed from, address indexed deployedBy, address deployedAddress, bytes32 codeHash, uint fee);

  function DeployRelay() {
  }

  function reserveDeployment(address requesterAddress, bytes32 codeHash, address tokenAddress, uint tokenNum, uint8 v, bytes32 r, bytes32 s) {
    // TODO: change signature to include token address and amount
    address signatureAddress = ecrecover(codeHash, v, r, s);
    if (signatureAddress != requesterAddress) throw;

    uint256 deploymentId = ++numDeployments;

    Deployment deployment = deployments[deploymentId];
    deployment.requester = requesterAddress;
    deployment.deployer  = msg.sender;
    deployment.codeHash = codeHash;
    deployment.token = tokenAddress;
    deployment.fee = tokenNum;

    NewDeployment(msg.sender, codeHash, deploymentId);
  }

  function confirmDeployment(uint256 deploymentId, address deployedAddress, bytes32 codeHash) {
    Deployment deployment = deployments[deploymentId];
    if (deployment.requester == 0x0) throw;
    if (deployment.deployed) throw;

    if (deployment.codeHash != codeHash) throw;
    if (!verifyDeployment(deployedAddress, codeHash)) throw;

    TokenInterface token = TokenInterface(deployment.token);
    if (token.allowance(deployment.requester, this) < deployment.fee) throw;

    if (token.transferFrom(deployment.requester, msg.sender, deployment.fee)) {
      deployment.deployed = true;
      Deployed(deployment.requester, msg.sender, deployedAddress, codeHash, deployment.fee);
    }
  }

  function verifyDeployment(address addr, bytes32 expectedHash) constant returns (bool result) {
    bytes32 deployedHash;

    assembly {
      let size := extcodesize(addr)
      let o_code := mload(0x40)
      mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
      mstore(o_code, size)
      extcodecopy(addr, add(o_code, 0x20), 0, size)
      deployedHash := sha3(add(o_code, 0x20), size)
    }

    result = (deployedHash == expectedHash);
  }

  function verifySignature(address from, uint num, bytes32 code) constant returns (bool result) {
    bytes32 expectedSignatureHash;
    expectedSignatureHash = sha3(from, num);

    result = (expectedSignatureHash == code);
  }

  function recoverAddress(bytes32 hash2, uint8 v, bytes32 r, bytes32 s) constant returns(address addr) {
    addr = ecrecover(hash2, v, r, s);
  }

}

