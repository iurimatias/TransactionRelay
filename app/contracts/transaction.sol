pragma solidity ^0.4.2;
contract SimpleStorageInterface {
  uint public storedData;
  function set(uint x);
  function get() constant returns (uint retVal);
}

contract Transaction {
  function Transaction() {
    SimpleStorageInterface simpleStorage = SimpleStorageInterface(0x8dd8b792f58e6277e466745cd0fa2f153178dd6e);
    simpleStorage.set(123);
  }
}

