const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();

router.get("/auth", (req, res, next) => {
  return res.send("we are on Auth");
});

router.post("/auth/login", async (req, res, next) => {
  MongoClient.connect(
    "mongodb+srv://admin2:admin2@cluster0-swr14.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("testdb");
      const credentials = await dbo
        .collection("collectiondb")
        .findOne({}, { projection: { _id: 0, email: 1, password: 1 } });

      if (
        credentials.email === req.body.email &&
        credentials.password === req.body.password
      ) {
        return res.send("Login Success");
      } else {
        return res.send("Login Error");
      }
    }
  );
});
module.exports = router;
