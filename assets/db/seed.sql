INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id) 
VALUES ('Video Game Designer', 75000, 1),
('Video Game Developer', 80000, 1),
('Video Game Tester', 50000, 1),
('Software Engineer', 100000, 2),
('Software Developer', 90000, 2),
('Accountant', 75000, 3),
('Lawyer', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Fulan', 'Fulana', 3, 1),
('Jan', 'Jansen', 4, 2),
('Bill', 'Johnson', 5, 2),
('Max', 'Musterman', 6, 3),
('Sean', 'Rudai', 7, 4);