import Transaction from './transaction';

const SHA256 = require('crypto-js/sha256');

export default class Block {
  constructor(
    // Timestamp of Creation
    private timestamp: number,
    // Data to store in Block
    private transactions: Transaction[],
    // Hash of previous Block
    private previousHash: string = '',
    // Changeable Number to reach the Goal of Consensus Algorithm
    private nonce: number = 0,
    // Current Hash of all Inputs
    private hash: string = ''
  ) {}

  calculateHash(): string {
    return SHA256(
      this.timestamp +
        this.transactions.toString() +
        this.previousHash +
        this.nonce
    );
  }

  hasValidTransactions(): boolean {
    for (const transaction of this.transactions) {
      if (!transaction.isTransactionValid()) {
        return false;
      }
    }
    return true;
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined ${this.hash}, with Nonce ${this.nonce}`);
  }

  getTransactions() {
    return this.transactions;
  }

  getHash() {
    return this.hash;
  }
}
