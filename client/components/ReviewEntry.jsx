import React from 'react';
import styles from './styles/EntryStyle.css';

const ReviewEntry = (props) => {
  // console.log(props);

  const formatDate = function (date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let newDate;
    newDate = date.slice(0, date.indexOf('T'));
    newDate = newDate.split('-');
    // console.log(newDate);
    let month = months[newDate[1] - 1];
    // console.log(month);
    let finalString = `${month} ${newDate[0]}`;
    return finalString;
  };

  return (
    {console.log(formatDate(props.rev[0].reviewDate))}
    <div id={styles.entryContainer}>
      <img src={props.rev[1].picture} id={styles.reviewAvatar} />
      <div id={styles.reviewName}>{props.rev[1].name}</div>
      <div id={styles.reviewDate}>{formatDate(props.rev[0].reviewDate)}</div>
      <div id={styles.reviewText}>{props.rev[0].reviewText}</div>
      <div id={styles.reviewFlag}><img id={styles.flagIcon} src='https://s3-us-west-1.amazonaws.com/fec-reviews/flag.svg' /></div>
      <div id={styles.reviewBorder}></div>
    </div>
  );
};

export default ReviewEntry;