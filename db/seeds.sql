INSERT INTO department (name)
VALUES ('IT'),
       ('Marketing'),
       ('Admin');

INSERT INTO role (title, salary, department_id)
VALUES ('Help Desk Manager', 100000.00, 1),
       ('Marketing Manager', 80000.00, 2),
       ('CEO', 1000000000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Troy', 'Testeroni', 1, 1),
       ('Karri', 'Kateroni', 2, 2),
       ('Avery', 'Averoni', 3, 3);