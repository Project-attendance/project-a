const MongoClient = require("mongodb").MongoClient;
const url = process.env.MY_URL;
const notifier = require("node-notifier");
function del(id, collection, res) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) return console.log(err);
      db = client.db("luck");
      var mongodb = require("mongodb");
      const myquery = { _id: new mongodb.ObjectID(id) };
      db.collection(collection).deleteOne(myquery, function (err) {
        if (err) throw err;
        notifier.notify({
          title: "Data inserted !",
          message: "succses",
        });
        res.redirect("/TimeTable-api");
      });
    }
  );
}
module.exports = del;
