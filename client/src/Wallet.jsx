import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const fieldVal = evt.target.value;
    setPrivateKey(fieldVal);
    const addr = toHex(secp.getPublicKey(fieldVal));
    setAddress(addr);
    if (addr) {
      const {
        data: { balance },
      } = await server.get(`balance/${addr}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input
          placeholder="Type private key"
          value={privateKey}
          onChange={onChange}
        />
      </label>

      {/* <div>public key: {address}</div> */}

      {/* <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label> */}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
