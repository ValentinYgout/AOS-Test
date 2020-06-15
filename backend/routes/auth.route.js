const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();

router.get("/auth", (req, res, next) => {
  return res.send("we are on Auth");
});

router.post("/auth/login", async (req, res, next) => {
  //console.log(req.body);
  MongoClient.connect(
    "mongodb+srv://admin2:admin2@cluster0-swr14.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("testdb");
      const credentials = dbo
        .collection("collectiondb")
        .findOne(
          {},
          { projection: { _id: 0, email: 1, password: 1 } },
          function (err, result) {
            if (err) throw err;
            console.log(result);
            return {
              email: req.body.email,
              password: req.body.password,
            };
          }
        );
      console.log("allait", credentials);
    }
  );
});
module.exports = router;
