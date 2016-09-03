Transaction Relay
======

[![Join the chat at https://gitter.im/iurimatias/transactionrelay](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iurimatias/transactionrelay?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Transaction Relay enables transaction fees of Ethereum contracts and transactions to be paid by any Currency (EIP20 compatible).

There are 2 roles in Transaction Relay:
* Requester: The user who wants to issue a transaction and pay in some token. The request is signed and broadcasted over Whisper.
* Relayer: The user who picks up the transaction and is willing to deploy it in exchange for the tokens proposed.

The contract will verify the transaction was deployed and compensate the Relayer.

__Transaction Relay__ is currently Alpha.

Possible Applications
======

* Contracts and transactions can be paid in different currencies that a user might find more convenient.
* 'pay-to-play' used to be the only model possible in Ethereum, in this model the issuer of the transaction needs to be able to own ether to pay for the interaction, TransactionRelay enalbes 3rd parties to take in the fee cost by issuing tokens to registered addresses. This could be usefull for application where the developer doesn't expect the user to own ether easily to pay for the transactions to interact with a specific dapp. It could also be used for controlled interactions e.g giving a use 10 free roulette spins, or accepting x free posts submissions per day for a registered user in a forum.
* Previously a blocker for some altcoins to migrate to ethereum as tokens was that their transactions would need to be paid in Ether. TransactionRelay enables their transactions to be paid 'natively'.

To do next
======
* Implement a market mechanism of the tokens<->ether rate

