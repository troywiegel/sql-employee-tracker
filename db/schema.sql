DROP DATABASE IF EXISTS db_name;
CREATE DATABASE db_name;

USE db_name;

CREATE TABLE tableName (
  id INT NOT NULL auto_increment PRIMARY KEY,
  movie_name VARCHAR(30) NOT NULL,
  ON DELETE CASCADE
);

CREATE TABLE tableName (
  id INT NOT NULL auto_increment PRIMARY KEY,
  movie_id INT,
  review TEXT NOT NULL,
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE CASCADE
);