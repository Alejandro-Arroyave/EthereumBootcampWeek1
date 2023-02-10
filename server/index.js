const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04ba8bb7667c79a2d9c343b601cc8749a798d220c40dacd8c82bee972d1cec337861a2fcf73351aa8ab215add1deb912b5c4e3af344e0de468071caa3cda3c39a3": 100,
  "04c867ff23f9a34e7e250a8b900b6b8f2827854d3ced84be09ce390e55fb89c047a157f9a463294bced44448b88dd2a037eb020a9e73742615cd42b55f0ce98ec5": 50,
  "04151e10278e91bd75f55bd610da77fb2d88c52212cf180df4d1acb5a647d3846ee32bab09dbe4e879875590bba08bd6abed5e413d1a4bda23b575cef7bed3af8b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
