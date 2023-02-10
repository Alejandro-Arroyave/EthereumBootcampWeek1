const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey) {
  const withoutFirstByte = publicKey.slice(1);
  const hashedPublicKey = keccak256(withoutFirstByte);

  return hashedPublicKey.slice(-20);
}

const privateKey = secp.utils.randomPrivateKey();

console.log("privateKey: " + toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log(toHex(publicKey));

// console.log("publicKey: " + toHex(getAddress(publicKey)));
