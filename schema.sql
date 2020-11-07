DROP DATABASE IF EXISTS trackerdb;
CREATE DATABASE trackerdb;
USE trackerdb;

CREATE TABLE department (
  -- TABLE CODE TO GO HERE
  id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE role (
  -- TABLE CODE TO GO HERE
  id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
  -- TABLE CODE TO GO HERE
  id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30)  NOT NULL,
    role_id INT,
    manager_id INT,
	PRIMARY KEY (id)
);