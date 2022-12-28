INSERT INTO tb_role (name) VALUES ('ROLE_ADMIN');
INSERT INTO tb_role (name) VALUES ('ROLE_MEMBER');

INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Joao', 'Silva','joao@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');
INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Maria', 'Joaquina','maria@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (2, 2);

INSERT INTO tb_genre(name) VALUES ('Ficção');
INSERT INTO tb_genre(name) VALUES ('Terror');
INSERT INTO tb_genre(name) VALUES ('Animação');

INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Harry Potter', 'Harry Potter', 'ecc15fee-9e7b-4820-9627-a67dca3d7260image04_grd.png', '2022-10-10', 'menino magico', 14, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Branca de Neve', 'Branca de Neve', 'ecc15fee-9e7b-4820-9627-a67dca3d7260image04_grd.png', '2022-10-10', 'menino magico', 18, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Galinha Pintadinha', 'Galinha Pintadinha', 'ecc15fee-9e7b-4820-9627-a67dca3d7260image04_grd.png', '2022-10-10', 'menino magico', 10, 'nao sei', 0, 'link do trailer');

INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (1, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (2, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (3, 2);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (3, 3);

INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-10', 'Filme muito legal', 0, 1, 1);
INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-11', 'Interessante, ele vai morrer', 1, 1, 1);
INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-11', 'Interessante, ele vai morrer', 1, 2, 1);