const express = require("express");
const helmet = require("helmet");

const {
   getAccounts,
   getAccount,
   addAccount,
   overwriteAccount,
} = require("./helpers/accounts");

const server = express();
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
   getAccounts()
      .then((accounts) => res.status(200).json(accounts))
      .catch((err) => {
         res.status(500).json({ message: "Error while fetching accounts" });
      });
});

server.get("/:id", (req, res) => {
   getAccount(req.params.id)
      .then((account) => res.status(200).json(account))
      .catch((err) => {
         res.status(500).json({ message: "Error while fetching account" });
      });
});

server.post("/", (req, res) => {
   addAccount(req.body)
      .then((newAccount) => res.status(201).json(newAccount))
      .catch((err) =>
         res.status(400).json({
            message:
               "Error while adding account. Please make sure to include a name and budget.",
         })
      );
});

server.put("/:id", (req, res) => {
   overwriteAccount(req.params.id, req.body)
      .then((updatedAccount) => res.status(200).json(updatedAccount))
      .catch((err) =>
         res
            .status(400)
            .json(
               "Error while overwriting account. Make sure to include a name and budget."
            )
      );
});

module.exports = server;
