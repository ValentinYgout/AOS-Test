const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

MongoClient.connect(
  "mongodb+srv://admin2:admin2@cluster0-swr14.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("testdb");
    dbo
      .collection("collectiondb")
      .findOne({}, { projection: { _id: 0, email: 1, password: 1 } }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  }
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//
const authRoute = require("./routes/auth.route");
app.use("/", authRoute);
//

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
