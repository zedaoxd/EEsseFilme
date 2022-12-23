INSERT INTO tb_role (name) VALUES ('ROLE_ADMIN');
INSERT INTO tb_role (name) VALUES ('ROLE_MEMBER');

INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Joao', 'Silva','joao@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');
INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Maria', 'Joaquina','maria@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (2, 2);