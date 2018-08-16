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

pool.connect((err, client2) => {
  if (err) console.log(err, client2);
  client = client2;
});

const redisAddress = process.env.REDIS;

const redisClient = redis.createClient(redisAddress);

app.get("/reviews/:listingId", (req, res) => {
  // let data = {
  //   overall: 0,
  //   accuracy: 0,
  //   location: 0,
  //   communication: 0,
  //   checkIn: 0,
  //   cleanliness: 0,
  //   value: 0
  // };
  redisClient.get(`/reviews/${req.params.listingId}`, (err, results) => {
    if (results) {
      console.log("Cache hit for " + req.params.listingId, results);
      res.send(results.row);
    } else {
      const query = `SELECT * FROM reviews WHERE id = ${req.params.listingId}`;
      client.query(query, (err, result) => {
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
//   models.reviews.getReviews(reviews => {
//     // this sums the values for each categories
//     for (let review of reviews) {
//       for (let key in aggregateObject) {
//         aggregateObject[key] = aggregateObject[key] + review[0].rating[key];
//       }
//     }
//     // this section calculates average score for each category
//     for (let key in aggregateObject) {
//       aggregateObject[key] = aggregateObject[key] / reviews.length;
//     }
//     // the aggregateObject is added to the reviews array
//     reviews.push(aggregateObject);
//     res.send(reviews);
//   }, req.params.listingId);

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
