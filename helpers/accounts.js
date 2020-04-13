const db = require("../data/dbConfig.js");

const getAccounts = () => {
   return db.from("Accounts").select("*");
};

const getAccount = (id) => {
   return db.from("Accounts").select("*").where({ id: id });
};

const addAccount = (name, budget) => {
   return db("Accounts")
      .insert({ name, budget })
      .then((idsCreated) => {
         return getAccount(idsCreated[0]);
      });
};

const overwriteAccount = (id, { name, budget }) => {
   return db("Accounts")
      .where({ id: id })
      .update({
         name,
         budget,
      })
      .then((count) => {
         if (count > 0) return getAccount(id);
         else {
            throw "No changes were made. Account with that ID does not exist.";
         }
      });
};
