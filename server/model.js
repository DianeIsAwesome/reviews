const db = require("../database/index");

module.exports = {
  reviews: {
    getReviews: function(cb, id) {
      const promises = [];
      let combinedReview = [];
      db.Review.find({ houseId: id }, null)
        .then(reviews => {
          for (let review of reviews) {
            promises.push(
              db.User.findOne({ userId: review.user }, null, function(
                err,
                user
              ) {
                if (err) {
                  return err;
                }
                let combinedObject = [review, user];
                combinedReview.push(combinedObject);
              })
            );
          }
        })
        .then(() => {
          Promise.all(promises).then(() => {
            cb(combinedReview);
          });
        });
    }
  }
};
