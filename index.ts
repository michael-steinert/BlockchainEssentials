import Block from './src/block';
import Blockchain from './src/blockchain';
import Transaction from './src/transaction';
import { createWallet, validateWallet } from './src/wallet';

// Blockchain Data Structure
const genesisBlock: Block[] = [new Block(Date.now(), [], '')];
// Difficulty for Consensus Algorithm
const difficulty: number = 3;
// Transactions to validate and add to Blockchain
const pendingTransactions: Transaction[] = [];
// Reward for Nodes that follow Consensus Algorithm
const miningReward: number = 4200;

const blockchain = new Blockchain(
  genesisBlock,
  difficulty,
  pendingTransactions,
  miningReward
);

const aliceWallet = createWallet();
const bobWallet = createWallet();
console.log(
  `Is the Wallet created from the Private Key equals to the Public Key? ${validateWallet(
    aliceWallet.privateKey,
    aliceWallet.publicKey
  )}`
);

// Initiate Transaction to transfer 42 Coins from Alice to Bob
const transaction1 = new Transaction(
  aliceWallet.publicKey,
  bobWallet.publicKey,
  42
);

//Sign Transaction with Private Key from Alice
transaction1.signTransaction(aliceWallet.keyPair);

// Submit a Transaction to Blockchain
blockchain.addTransaction(transaction1);
console.log('Starting Mining');
blockchain.minePendingTransactions(aliceWallet.publicKey);

// Initiate Transaction to transfer 21 Coins from Alice to Bob
const transaction2 = new Transaction(
  aliceWallet.publicKey,
  bobWallet.publicKey,
  21
);

//Sign Transaction with Private Key from Alice
transaction2.signTransaction(aliceWallet.keyPair);

// Submit a Transaction to Blockchain
blockchain.addTransaction(transaction2);
console.log('Starting Mining');
blockchain.minePendingTransactions(aliceWallet.publicKey);

console.log(
  `Balance of Bob's Account is ${blockchain.getBalanceOfAddress(
    bobWallet.publicKey
  )}`
);

console.log(`Is Blockchain valid? ${blockchain.isBlockchainValid()}`);

// Tamper the Blockchain
blockchain.getBlockchain()[0].getTransactions()[0].setAmount(5);

console.log(
  `Is Blockchain valid after Tampering? ${blockchain.isBlockchainValid()}`
);

console.log(JSON.stringify(blockchain, null, 2));
