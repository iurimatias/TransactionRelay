contract VerifySignature {

  function testECRecover(bytes32 hash2, uint8 v, bytes32 r, bytes32 s) constant returns(address addr) {
    addr = ecrecover(hash2, v, r, s);
  }

}
