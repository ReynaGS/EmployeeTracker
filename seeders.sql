INSERT INTO department (name) values ("Human Resources");
INSERT INTO department (name) values ('Operations');

INSERT INTO role (title, salary, department_id) values ('Director', 100000,1 );
INSERT INTO role (title, salary, department_id) values ('Analyst', 500000,2 );

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Reyna", "Garcia",1,null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Thais", "Garcia",2,1);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;