contract Deployer {
  mapping (bytes32 => bool) public deployed;
  mapping (uint => bytes32) public registeredHash;

  function Deployer() {
  }

  function registerTransaction(uint id, bytes32 contractHash) {
    if (deployed[contractHash]) throw;
    deployed[contractHash] = false;
    registeredHash[id] = contractHash;
  }

  function verifyDeployment(uint id, address addr) {
    bytes32 deployedHash;

    assembly {
      let size := extcodesize(addr)
      let o_code := mload(0x40)
      mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
      mstore(o_code, size)
      extcodecopy(addr, add(o_code, 0x20), 0, size)
      deployedHash := sha3(add(o_code, 0x20), size)
    }

    if (deployedHash == registeredHash[id]) {
      deployed[deployedHash] = true;
    }
  }

}

