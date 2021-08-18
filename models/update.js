const MongoClient = require("mongodb").MongoClient;
const url = process.env.MY_URL;

function update(collection, data, res) {
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
      db.collection(collection).updateOne(
        myquery,
        data,
        { upsert: true },
        function (err, obj) {
          if (err) throw err;
          console.log("1 updated deleted");
        }
      );
    }
  );
}

module.exports = update;
