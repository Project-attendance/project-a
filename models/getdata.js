const MongoClient = require("mongodb").MongoClient;
const myurl = process.env.MY_URL;

function getdata(collaction, res) {
  MongoClient.connect(
    myurl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) return console.log(err);
      db = client.db("luck");
      db.collection(collaction)
        .find({})
        .toArray(function (err, result) {
          //res.json(result);
          //console.log(result);
          res.render("akshata", { data: result });
          console.log(result);
        });
    }
  );
}
module.exports = getdata;
