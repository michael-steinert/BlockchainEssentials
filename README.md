# Blockchain Essentials

## Blockchain

- Blockchain is a Data Structure that holds immutable historic transactional Records while ensuring Security and Transparency
- It forms a decentralized Ledger

### Characteristics

- A Blockchain is decentralized, therefore there is no single Entity or Group that hold the Authority of the overall Network
- A Blockchain is immutable, therefore Data that once is written into it can not be changed
- A Blockchain is a Peer-to-Peer Network that allows all the Participants to hold an identical Copy of Transactions, enabling Approval through a Machine Consensus
- Decentralization enhances Availability and removes Single Points fo Failure

## Block

- A Block holds Information about Metadata and its Transactions
- It is uniquely identified by its Hash and Height (Depth of Blockchain)
- Blocks are cryptographically linked with their previous Block Hash
- Once a Block is created, its Hash calculated according to the contained Information
- If the contained Information changes, the Hash will change too and the Blockchain will lose their Consistency

## Node

- Nodes build the Infrastructure of a Blockchain
- They communicate via a Peer-to-Peer Data Stream and to keep the Consensus of the Blockchain

## Transaction

- A Transaction is a Unit of Tasks that is stored in public Records (Blocks)

![transaction_process](https://user-images.githubusercontent.com/29623199/191591126-58898565-e48d-4df8-aef8-dba8b7de2880.png)

## Account

- To participate in a Blockchain every Participant needs an Account
- The Account consist of the Public Key which is derived from the Private Key
- The Public Key and Private Key are mathematically related
- A Digital Signature allows for Accountability in the Blockchain
- To Point of Signing a Transaction is not to secure itself, but to secure the Point of Origin

### Digital Signature

- During a Digital Signature the Transaction is signed with the Private Key
- A signed Transaction can eb checked for its Integrity with the Public Key

## Consensus

- Consensus is the State in which a determined Number of Nodes agree on the Contents of a Transaction or Block after running their own Validation Process
- All new Transaction must be reviewed and confirmed before being accepted to build a Consensus

### Proof of Work

- Mining is the Process in which Transactions between Users are verified and added into the Blockchain's Ledger
- Proof of Work involves the following Steps
  - Hashing the Block Header until a valid Block Hash is produced
  - The first Miner that generate a valid Block Hash add the Block into the Blockchain and is rewarded
  - Miners also getting paid for their Work as Auditors

## Wallet

- A Wallet is a secure Place to store and access private Keys, which are used for Address Generation and Signing Transactions
- Cryptocurrency is assigned to the Address from the Wallet but recorded in a distributed Ledger (Blockchain)
