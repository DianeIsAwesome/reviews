CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL,
  housename text NOT NULL,
  picture text NOT NULL,
  reviewtitle text NOT NULL,
  reviewtext text NOT NULL,
  reviewdate text NOT NULL,
  rating int NOT NULL
);