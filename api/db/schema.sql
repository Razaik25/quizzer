DROP TABLE if exists users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  canada INTEGER,
  celebrities INTEGER,
  coding INTEGER,
  friendstvshow INTEGER,
  funny INTEGER,
  generalknowledge INTEGER,
  harrypotter INTEGER,
  math INTEGER,
  random INTEGER,
  superheroes INTEGER
);
