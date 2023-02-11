const express = require("express");
const app = express();
const cors = require("cors");
const { recoverKey } = require("./utils");
const { toHex } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "2291231659e1a6dfc2b0138622a13c2b5b4f80d5": 100,
  "8ad04ddd3c3eba3120b52a9734e9975f0837b6fb": 50,
  "8ad04ddd3c3eba3120b52a9734e9975f0837b6fb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { message, signature, recoveryBit } = req.body;
  const [sender, amount, recipient] = message.split(",");
  try {
    const recovered = await recoverKey(message, signature, recoveryBit);

    if (sender === toHex(recovered)) {
      setInitialBalance(sender);
      setInitialBalance(recipient);

      if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
      }
    } else {
      res.status(400).send({
        message: "Validation error: Message not authorized/corrupted!",
      });
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
