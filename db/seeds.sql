USE employee_db;

INSERT INTO department (name)
VALUES ('Developers'),
       ('Marketing'),
       ('Admin');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Developer', 120000, 1),
       ('Junior Developer', 75000, 1),
       ('Marketing Manager', 90000, 2),
       ('CEO', 1000000000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Troy', 'Testeroni', 1, NULL),
       ('Avery', 'Averoni', 2, 1),
       ('Karri', 'Karrioni', 3, NULL),
       ('Luis', 'Pascuroni', 4, NULL);