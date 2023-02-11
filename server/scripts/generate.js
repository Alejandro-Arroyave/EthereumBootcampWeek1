const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");
const { getAddress } = require("../utils");

const privateKey = secp.utils.randomPrivateKey();

console.log("privateKey: " + toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("publicKey: " + toHex(getAddress(publicKey)));
