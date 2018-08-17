import React from 'react';
import styles from './styles/AggregatedStyle.css';

const AggregatedReviews = (props) => {
  const renderStars = function (rating) {
    let outputArray = [];
    let numStars = 0;
    // this loop renders all initial full stars
    while (rating / 1 > 1) {
      outputArray.push(<img key={numStars.toString()} className={styles.star} src='https://s3-us-west-1.amazonaws.com/fec-reviews/star.svg' />);
      rating -= 1;
      numStars += 1;
    }
    // this conditional chain renders either an empty, half, or full start depending on decimal
    if (rating > 0.75) {
      outputArray.push(<img key={numStars.toString()} className={styles.star} src='https://s3-us-west-1.amazonaws.com/fec-reviews/star.svg' />);
      numStars += 1;
    } else if (rating > 0.25) {
      outputArray.push(<img key={numStars.toString()} className={styles.star} src='https://s3-us-west-1.amazonaws.com/fec-reviews/star-half.svg' />);
      numStars += 1;
    } else {
      outputArray.push(<img key={numStars.toString()} className={styles.star} src='https://s3-us-west-1.amazonaws.com/fec-reviews/star-clear.svg' />);
      numStars += 1;
    }
    // this renders remaining empty stars when necessary
    while (numStars < 5) {
      outputArray.push(<img key={numStars.toString()} className={styles.star} src='https://s3-us-west-1.amazonaws.com/fec-reviews/star-clear.svg' />);
      numStars += 1;
    }
    return outputArray;
  };

  return (
    <div id={styles.aggregateContainer}>
      <div id={styles.accuracy}>Accuracy</div>
      <div id={styles.accuracyStars} className={styles.starSet}>
        {console.log(props.ratings)}
        {renderStars(props.ratings[0].rating)}
      </div>
      <div id={styles.location}>Location</div>
      <div id={styles.locationStars} className={styles.starSet}>
        {renderStars(props.ratings[0].rating)}
      </div>
      <div id={styles.communication}>Communication</div>
      <div id={styles.communicationStars} className={styles.starSet}>
        {renderStars(props.ratings[0].rating)}
      </div>
      <div id={styles.checkIn}>Check-in</div>
      <div id={styles.checkInStars} className={styles.starSet}>
        {renderStars(props.ratings[0].rating)}
      </div>
      <div id={styles.cleanliness}>Cleanliness</div>
      <div id={styles.cleanlinessStars} className={styles.starSet}>
        {renderStars(props.ratings[0].rating)}
      </div>
      <div id={styles.value}>Value</div>
      <div id={styles.valueStars} className={styles.starSet}>
        {renderStars(props.ratings[0].rating)}
      </div>
    </div>
  );
};

export default AggregatedReviews;