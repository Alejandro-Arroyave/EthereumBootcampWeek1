import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

export const hashMessage = (message) => {
  return keccak256(utf8ToBytes(message));
};

export const signMessage = async (message, privateKey) => {
  const hashedMsg = hashMessage(message);
  console.log(privateKey);
  return secp.sign(hashedMsg, privateKey, { recovered: true });
};
