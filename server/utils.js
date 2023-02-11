const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes } = require("ethereum-cryptography/utils");

const hashMessage = (message) => {
  return keccak256(utf8ToBytes(message));
};

const recoverKey = async (message, signature, recoveryBit) => {
  const hashedMsg = hashMessage(message);
  const sign = hexToBytes(signature);
  const a = hashedMsg instanceof Uint8Array;
  const b = signature instanceof Uint8Array;
  return secp.recoverPublicKey(hashedMsg, sign, recoveryBit);
};

function getAddress(publicKey) {
  const withoutFirstByte = publicKey.slice(1);
  const hashedPublicKey = keccak256(withoutFirstByte);

  return hashedPublicKey.slice(-20);
}

module.exports = { recoverKey, getAddress };
