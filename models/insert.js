const MongoClient = require("mongodb").MongoClient;
const url = process.env.MY_URL;
const notifier = require("node-notifier");
function insert(collaction, data, res) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err, client) => {
      if (err) return console.log(err);
      db = client.db("luck");
      console.log("connected :}");
      db.collection(`${collaction}`).insertOne(data, (err, result) => {
        //console.log(result);
        if (err) return console.log(err);
        console.log("saved to database");
        //alert("saved to database");
        notifier.notify({
          title: "Data inserted !",
          message: "succses",
        });
        res.redirect("/TimeTable-api");
      });
    }
  );
}
module.exports = insert;
