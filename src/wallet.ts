import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

export const createWallet = () => {
  const keyPair: elliptic.ec.KeyPair = ec.genKeyPair();
  const publicKey: string = keyPair.getPublic('hex');
  const privateKey: string = keyPair.getPrivate('hex');

  return { publicKey, privateKey, keyPair };
};

export const validateWallet = (privateKey: string, publicKey: string) => {
  const key = ec.keyFromPrivate(privateKey);

  const derivedPublicKey = key.getPublic('hex');

  return derivedPublicKey === publicKey;
};
