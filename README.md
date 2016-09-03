Transaction Relay
======

[![Join the chat at https://gitter.im/iurimatias/transactionrelay](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iurimatias/transactionrelay?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Transaction Relay allows Ethereum contracts and transactions to be paid by any Currency (EIP20 compatible).

There are 2 roles in Transaction Relay:
* Requester: The user who wants to issue a transaction and pay in some token. The request is signed and broadcasted over Whisper.
* Relayer: The user who picks up the transaction and is willing to deploy it in exchange for the tokens proposed.

The contract will verify the transaction was deployed and compensate the Relayer.

__Transaction Relay__ is currently Alpha.

