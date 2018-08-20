require('newrelic')
require('dotenv').config()
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3001;

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  max_connections: 100
}

const pool = new pg.Pool(config);

app.use(bodyParser.json());
app.use("/", express.static(`${__dirname}/../public`));
app.use("/listing/:listingId", express.static(`/${__dirname}/../public`));

pool.connect((err) => {
  if (err) console.log(err, client2);
});

const redisAddress = process.env.REDIS;

const redisClient = redis.createClient(redisAddress);

app.get("/reviews/:listingId", (req, res) => {
  redisClient.get(`/reviews/${req.params.listingId}`, (err, results) => {
    if (results) {
      console.log("Cache hit for " + req.params.listingId, results, typeof results);
      res.send(results);
    } else {
      const query = `SELECT * FROM reviews WHERE id = ${req.params.listingId}`;
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err, 'error in query');
        } else {
          redisClient.setex(`/reviews/${req.params.listingId}`, 3000, JSON.stringify(result.rows));
          res.send(result.rows);
        }
      })
    }
  });
});

app.post("/reviews/:listingId", (req, res) => {
  let aggregateObject = new Review(req.body);

  aggregateObject.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(aggregateObject);
  });
});

app.put("/reviews/:listingId", (req, res) => {
  Review.findByIdAndUpdate(
    req.params.listingId,
    req.body,
    { new: true },
    (err, data) => {
      if (err) return res.status(500).send(err);
      return res.send(data);
    }
  );
});

app.delete("/reviews/:listingId", (req, res) => {
  Review.findByIdAndRemove(req.params.listingId, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    const response = {
      message: "Review succesfully deleted",
      id: data._id
    };
    return res.status(200).send(response);
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
