DROP DATABASE IF EXISTS moviedude;
CREATE DATABASE moviedude;

\c moviedude;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL 
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  genre_id INT REFERENCES genres(id),
  img_url VARCHAR NOT NULL
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  stars INT NOT NULL,
  CONSTRAINT stars_range_check CHECK (stars >= 1 and stars<= 5),
  movie_id INT REFERENCES movies(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  text VARCHAR NOT NULL,
  movie_id INT REFERENCES movies(id)
);