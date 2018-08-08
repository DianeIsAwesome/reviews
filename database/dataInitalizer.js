const faker = require('faker');
//houseId
//name
//picture
//reviewTitle
//reviewText
//reviewDate
//Overallrating

const generateRandomNumber = function (lowerLimit, upperLimit) {
  return lowerLimit + Math.floor(upperLimit * Math.random());
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const years = [2016, 2017, 2018];

const imageEndpoint = 'https://s3-us-west-1.amazonaws.com/fec-reviews/';
for (let i = 0; i < 1000000; i++) {
  console.log(
    `${i},house${i},${imageEndpoint}/home_${(i % 5) +
    1}.jpg,${faker.lorem.sentence()},${faker.lorem.sentence()},${months[i % 12] +
    ' ' + years[i % 3]},${generateRandomNumber(1, 5)}`
  );
}
