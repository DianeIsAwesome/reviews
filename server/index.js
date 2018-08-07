const express = require("express");
const models = require("./model.js");
// const path = require('path');
const app = express();

app.use("/", express.static(`${__dirname}/../public`));
app.use("/listing/:listingId", express.static(`/${__dirname}/../public`));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET");
  next();
});

// app.get('*/bundle.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
// });

app.get("/reviews/:listingId", (req, res) => {
  let aggregateObject = {
    overall: 0,
    accuracy: 0,
    location: 0,
    communication: 0,
    checkIn: 0,
    cleanliness: 0,
    value: 0
  };

  models.reviews.getReviews(reviews => {
    // this sums the values for each categories
    for (let review of reviews) {
      for (let key in aggregateObject) {
        aggregateObject[key] = aggregateObject[key] + review[0].rating[key];
      }
    }
    // this section calculates average score for each category
    for (let key in aggregateObject) {
      aggregateObject[key] = aggregateObject[key] / reviews.length;
    }
    // the aggregateObject is added to the reviews array
    reviews.push(aggregateObject);
    res.send(reviews);
  }, req.params.listingId);
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

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
