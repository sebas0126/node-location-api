express = require("express");
router = express.Router();

MongoClient = require("mongodb").MongoClient;

var uri = "mongodb://admin:admin@cluster0-shard-00-00-hjuxm.mongodb.net:27017,cluster0-shard-00-01-hjuxm.mongodb.net:27017,cluster0-shard-00-02-hjuxm.mongodb.net:27017/location?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

function getData(collection, query){
  return MongoClient.connect(uri)
  .then((db) => {
    return db.collection(collection).find(query).toArray()
    .then((res) => {
      return Promise.resolve(res);
      db.close();
    })
    .catch((err) => {
      return Promise.reject(err);
    })
  })
  .catch(err => {
    return Promise.reject(err);
  });
}

router.get("/states", (req, res) => {
  var query = {};
  getData("states", query)
  .then(data => {
    res.json(data);
  })
})

router.get("/cities", (req, res) => {
  var state = req.param("state");
  var query = {};
  if(state){
    query = {
      ID_DEPARTAMENTO: state
    }
  }
  getData("cities", query)
  .then(data => {
    res.json(data);
  })
})


module.exports = router;