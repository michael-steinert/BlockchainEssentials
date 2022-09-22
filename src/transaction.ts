const SHA256 = require('crypto-js/sha256');
import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

export default class Transaction {
  constructor(
    // Sender of Transaction
    private fromAddress: string,
    // Recipient of Transaction
    private toAddress: string,
    // Payload of Transaction
    private amount: number,
    // Signed Transaction
    private signature?: elliptic.SignatureInput
  ) {}

  calculateHash(): string {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey: elliptic.ec.KeyPair): void {
    // Miner Transaction is valid
    if (this.fromAddress === null) {
      return;
    }

    // Authorize Transaction by verifying that Source Account is the Person's Address / Public Key
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('Wrong Key to sign the Transaction');
    }

    // Sign Transaction Hash with Private Key
    const signedHash = signingKey.sign(this.calculateHash(), 'base64');

    // Convert Signature to DER Encoding
    this.signature = signedHash.toDER('hex');

    console.log(`Signature of Transaction ${this.signature}`);
  }

  isTransactionValid(): boolean {
    // Miner Transaction is valid
    if (this.fromAddress === null) {
      return true;
    }

    // Check that Transaction contains its Signature
    if (!this.signature || this.signature.toString.length === 0) {
      throw new Error('No Signature in Transaction');
    }

    // Convert From Address to get Public Key
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

    // Authorize Transaction by verifying that Source Account is the Person's Address / Public Key
    return publicKey.verify(this.calculateHash(), this.signature!);
  }

  getFromAddress(): string {
    return this.fromAddress;
  }

  getToAddress(): string {
    return this.toAddress;
  }

  getAmount(): number {
    return this.amount;
  }

  // Exists to tamper the Transaction
  setAmount(amount: number): void {
    this.amount = amount;
  }
}
