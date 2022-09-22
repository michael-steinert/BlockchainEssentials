import Block from './block';
import Transaction from './transaction';

export default class Blockchain {
  constructor(
    // Blockchain Data Structure
    private blockchain: Block[] = [new Block(Date.now(), [], '')],
    // Difficulty for Consensus Algorithm
    private difficulty: number = 3,
    // Transactions to validate and add to Blockchain
    private pendingTransactions: Transaction[],
    // Reward for Nodes that follow Consensus Algorithm
    private miningReward: number = 42
  ) {}

  getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.getFromAddress || !transaction.getToAddress) {
      throw new Error('Transaction must include the From and To Address');
    }
    if (!transaction.isTransactionValid()) {
      throw new Error('Transaction must be valid to be added into Blockchain');
    }
    // Add Transaction to Mempool
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress: string): void {
    // Package all pending Transactions together in the same Block
    const latestBlock = this.getLatestBlock();

    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      latestBlock.getHash()
    );

    // Mining Block until it matches Requirements
    block.mineBlock(this.difficulty);
    console.log('Block successfully mined');

    this.blockchain.push(block);

    // Pet the Miner Fee Transaction into pending Transactions for the next Mining Process
    this.pendingTransactions = [
      // First Transaction in next Block
      new Transaction('', miningRewardAddress, this.miningReward),
    ];
  }

  getBalanceOfAddress(address: string): number {
    let balance: number = 0;
    for (const block of this.blockchain) {
      for (const transaction of block.getTransactions()) {
        // Address has sent Coins to another Person / Address
        if (transaction.getFromAddress() === address) {
          balance -= transaction.getAmount();
        }
        // Address has received Coins from another Person / Address
        if (transaction.getToAddress() === address) {
          balance += transaction.getAmount();
        }
      }
    }
    return balance;
  }

  isBlockchainValid(): boolean {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];

      // Check if all Transaction in current Block are valid
      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      // Check if Hash of current Block is valid
      if (currentBlock.getHash() !== currentBlock.calculateHash()) {
        console.error(`Current Hash not equal ${currentBlock.getHash()}`);
        return false;
      }

      // Check Hash of previous Block is valid
      if (previousBlock.getHash() !== previousBlock.calculateHash()) {
        console.error(`Previous Hash not equal ${previousBlock.getHash()}`);
        return false;
      }
    }
    return true;
  }

  getBlockchain() {
    return this.blockchain;
  }
}
