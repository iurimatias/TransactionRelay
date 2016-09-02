//contract Token {
//  function transfer( address to, uint value) returns (bool ok);
//  function transferFrom( address from, address to, uint value) returns (bool ok);
//  function approve(address spender, uint value) returns (bool ok);
//}

contract Deployer {
  mapping (bytes32 => bool) public deployed;
  mapping (uint => bytes32) public registeredHash;
  event Deployed(address indexed from, address indexed deployedBy, address deployedAddress, uint fee);

  function Deployer() {
  }

  function verifySignature(address from, uint num, bytes32 code) constant returns (bool result) {
    bytes32 expectedSignatureHash;
    expectedSignatureHash = sha3(from, num);

    result = (expectedSignatureHash == code);
  }

  // reminder sha3 need {encoding: 'hex'}
  function confirmDeployment(address deployedAddress, address requesterAddress, bytes32 codeHash, uint tokenNum, bytes32 signatureHash, uint8 v, bytes32 r, bytes32 s) {
    // check signature authorizes codeHash and tokenNum
    // * recover address
    // * recover signature
    address signatureAddress;
    signatureAddress = ecrecover(signatureHash, v, r, s);

    if (signatureAddress != requesterAddress) throw;

    // check code was deployed
    bool wasDeployed;
    wasDeployed = verifyDeployment(deployedAddress, codeHash);

    if (!wasDeployed) throw;

    // transfer tokens to sender
    if (token.allowance(owner, this) < tokenNum) throw;

    if (token.transferFrom(owner, deployedAddress, tokenNum)) {
      Deployed(from, msg.sender, deployedAddress, codeHash, tokenNum);
    }
  }

  function registerTransaction(uint id, bytes32 contractHash) {
    if (deployed[contractHash]) throw;
    deployed[contractHash] = false;
    registeredHash[id] = contractHash;
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

}

