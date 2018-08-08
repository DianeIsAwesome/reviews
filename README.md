# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD API Information

Send all AJAX requests to "/reviews/:listingId" where listingId
is the desired listing ID.

To retrieve a data point, send a get request the above mentioned
endpoint and the response body will be a JSON object shaped in the
form of the following schema:

```````````
const reviewSchema = new Schema ({
  houseId: Number,
  reviewTitle: String,
  reviewText: String,
  reviewDate: Date,
  helpfulCount: Number,
  reportedCount: {inappropriate: Number, hateful: Number, fake: Number},
  response: {name: String, responseText: String, responseDate: Date, responsePicture: String},
  rating: {overall: Number, accuracy: Number, location: Number, communication: Number, checkIn: Number, cleanliness: Number, value: Number},
  group: Number,
  user: Number
});
`````````````

To create a data point, send a post request to the above mentioned
endpoint in the response body with a JSON object shaped in the form
of the following schema:
`````````````
const reviewSchema = new Schema ({
  houseId: Number,
  reviewTitle: String,
  reviewText: String,
  reviewDate: Date,
  helpfulCount: Number,
  reportedCount: {inappropriate: Number, hateful: Number, fake: Number},
  response: {name: String, responseText: String, responseDate: Date, responsePicture: String},
  rating: {overall: Number, accuracy: Number, location: Number, communication: Number, checkIn: Number, cleanliness: Number, value: Number},
  group: Number,
  user: Number
});
`````````````
To update a data point, send a put request to the above mentioned
endpoint in the response body with a JSON object with the desired
properties and the updated values.

To delete a data point, send a delete request to the above mentioned
endpoint.

All responses will contain either a confirmation message or and error message.