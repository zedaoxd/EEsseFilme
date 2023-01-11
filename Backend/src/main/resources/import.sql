INSERT INTO tb_role (name) VALUES ('ROLE_ADMIN');
INSERT INTO tb_role (name) VALUES ('ROLE_MEMBER');

INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Joao', 'Silva','joao@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');
INSERT INTO tb_user (first_Name, last_Name, email, password) VALUES ('Maria', 'Joaquina','maria@gmail.com','$2a$10$m4iHP.TxD/F6E3y5WKGcSu4OAQ7MDbO6vb3eWspQCMu0FbaOeATWe');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (2, 2);

INSERT INTO tb_genre(name) VALUES ('Ficção');
INSERT INTO tb_genre(name) VALUES ('Terror');
INSERT INTO tb_genre(name) VALUES ('Animação');

INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Harry Potter', 'Harry Potter', 'bdb1b4df-2b2a-4882-bfe0-f7ea802cd0b5harry.jpg', '2022-10-10', 'menino magico', 14, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Branca de Neve', 'Branca de Neve', '71035374-927c-48a6-84a5-5a9aae6f9059Branca_Neve_Caçador.jpg', '2022-10-10', 'menino magico', 18, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Galinha Pintadinha', 'Galinha Pintadinha', '9d541d75-c231-4d07-86b0-9a122cae8310D_NQ_NP_847266-MLB48774854907_012022-W.jpg', '2022-10-10', 'menino magico', 10, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('BLACK ADAN', 'ADÃO NEGRO', '0d2af47f-cbe3-4e88-beef-d8c28b683d674920_capa.jpg', '2022-10-20', 'Adão Negro é o filme solo do anti-herói, baseado no personagem em quadrinhos Black Adam (Dwayne Johnson) da DC Comics, grande antagonista de Shazam!, tendo no longa, sua história de origem explorada, e revelando seu passado de escravo no país Kahndaq. Nascido no Egito Antigo, o anti-herói tem super força, velocidade, resistência, capacidade de voar e de disparar raios. Alter ego de Teth-Adam e filho do faraó Ramsés II, Adão Negro foi consumido por poderes mágicos e transformado em um feiticeiro. Grande inimigo de Shazam! nas HQs, apesar dele acreditar em seu pontecial e, inclusive, oferecê-lo como um guerreiro do bem, Adão Negro acaba usando suas habilidades especiais para o mal. O anti-herói em busca de redenção ou um herói que se tornou vilão, pode ser capaz de destruir tudo o que estiver pela frente - ou de encontrar seu caminho.', 14, ' Dwayne Johnson, Aldis Hodge, Pierce Brosnan', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('TOP GUN: MAVERICK', 'TOP GUN: MAVERICK', '23319fb3-5de3-424f-98f0-2037bd550a6aTop_Gun_Maverick.jpg', '2022-05-26', 'Na sequência de Top Gun: Ases Indomáveis, acompanhamos a história de Pete “Maverick” Mitchell (Tom Cruise), um piloto à moda antiga da Marinha que coleciona muitas condecorações, medalhas de combate e grande reconhecimento pela quantidade de aviões inimigos abatidos nos últimos 30 anos. Entretanto, nada disso foi suficiente para sua carreira decolar, visto que ele deixou de ser um capitão e tornou-se um instrutor. A explicação para esse declínio é simples: Ele continua sendo o mesmo piloto rebelde de sempre, que não hesita em romper os limites e desafiar a morte. Nesta nova aventura, Maverick precisa provar que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas. Após 34 anos do clássico, acompanhem o filme do premiado produtor Jerry Bruckheimer e de Joseph Kosinski, mesmo diretor de Tron: O Legado (2010) e Oblivion (2013).', 10, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('THE BLACK PHONE', 'O TELEFONE PRETO', '926084e4-b78a-4b2a-944a-b5545031e90881hWb9h61JL.jpg', '2022-06-21', 'Em O Telefone Preto, em 1978, uma série de sequestros estão acontecendo na cidade de Denver. Ethan Hawke interpreta o "Grabbler", um serial killer que tem seu alvo crianças do bairro. Finney Shaw, um garoto de 13 anos, é sequestrado. o garoto acorda em um porão, onde há apenas uma cama e um telefone preto em uma das paredes. Quando o aparelho toca, o garoto consegue ouvir a voz das vítimas anteriores do assassino, e elas tentam evitar que o Finney sofra o mesmo destino. Enquanto isso, sua irmã Gwen tem sonhos que indicam o lugar onde ele pode estar e corre contra o tempo para tentar ajudar os detetives Wright e Miller a ajudar o irmão, apenas para que isso seja em vão. Finney continua a fazer tentativas para escapar que apenas falham, até que uma das vítimas do serial killler fala sobre um plano que finalmente poderia levar Finney à liberdade.', 10, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('NOPE', 'NÃO! NÃO OLHE!', '781834b6-756d-4256-9228-5418eeba4f82nope-trailer-official-posts-trilhadomedo-1.jpg', '2022-08-25', 'Novo filme de terror do diretor Jordan Peele (Corra e Nós). Em Não! Não Olhe! uma cidade do interior da Califórnia começa a ter eventos bizarros e extraterrestres. Uma dupla de irmãos interpretado por Keke Palmer (True Jackson e Alice) e Daniel Kaluuya (Corra e Judas e o Messias Negro), possuem um rancho de cavalos e são vizinhos de um parque de diversões de uma série de televisão do personagem interpretado por Steven Yeun, inspirada no velho oeste. Os dois então são testemunhas de eventos bizarros e discos voadores.', 10, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('DOUTOR ESTRANHO NO MULTIVERSO DA LOUCURA', 'DOUTOR ESTRANHO NO MULTIVERSO DA LOUCURA', '44b4d83c-89be-411b-9f43-0183e093f811stellar_vortex_pay1_instagram_poster_brazil_6559af1a.jpeg', '2022-05-05', 'Em Doutor Estranho no Multiverso da Loucura, após derrotar Dormammu e enfrentar Thanos nos eventos de Vingadores: Ultimato, o Mago Supremo, Stephen Strange (Benedict Cumberbatch), e seu parceiro Wong (Benedict Wong), continuam suas pesquisas sobre a Joia do Tempo. Mas um velho amigo que virou inimigo coloca um ponto final nos seus planos e faz com que Strange desencadeie um mal indescritível, o obrigando a enfrentar uma nova e poderosa ameaça. O longa se conecta com a série do Disney+ WandaVision e tem relação também com Loki. O longa pertence a fase 4 do MCU onde a realidade do universo pode entrar em colapso por causa do mesmo feitiço que trouxe os vilões do Teioso para o mundo dos Vingadores e o Mago Supremo precisará contar com a ajuda de Wanda (Elizabeth Olsen), que vive isolada desde os eventos de WandaVision.', 18, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('DESENCHANTED', 'DESENCANTADA', '9738f146-1351-47ec-902f-bc6b345eb7e0filmes_10828_desencantanda-filme.jpg', '2022-11-18', 'Desencantada é a sequência da comédia Encantada (2007), sucesso em que a princesa de um mundo mágico (Amy Adams) é transportada para a cidade de Nova York, tendo que se acostumar com a agitada vida real contemporânea. No novo longa, Giselle se muda com a família para o subúrbio e acaba fazendo um pedido mágico para que sua vida volte a ser um conto de fadas. Porém, a situação foge do controle e começa uma corrida contra o tempo para ajeitar as coisas em busca de um final feliz.', 10, 'nao sei', 5, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Spider-Man: No Way Home', 'Homem-Aranha: Sem Volta para Casa', '1da99370-8bdb-4804-9097-46ef14ee46daKEY ART_SPIDER NO WAY HOME.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('batman vs superman', 'batman vs superman', 'eac9e1ff-a492-40b4-a1ee-4f0bdb11da7eBatmanVsSuperman2.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('liga da justiça', 'liga da justiça', 'f18d8a9d-7dc6-434f-ae20-56f2f612b9c5Zack_Snyder''s_Justice_League.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('vingadores: ultimato', 'vingadores: ultimato', '0c6098e7-8dca-471c-b12c-037f3901a9da2428965.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('Mulher maravilha', 'Mulher maravilha', '6f7d5358-0db8-4133-8ea7-f0b6c2adc1d4Mulher_Maravilha_2009.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');
INSERT INTO tb_movie (origin_Title, national_Title, image, release_Date, synopsis, parental_Rating, main_Actors, average_Rating, movie_Trailer) VALUES ('aquamen', 'aquamen', 'b1bdac82-aedb-427c-83f8-5cb537989b0f2826074.jpg-c_310_420_x-f_jpg-q_x-xxyxx.jpg', '2021-12-16', 'Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo. Agora, Peter não só deter vilões de suas outras versões e fazer com que eles voltem para seu universo original, mas também aprender que, com grandes poderes vem grandes responsabilidades.', 10, 'nao sei', 0, 'link do trailer');



INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (1, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (2, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (3, 2);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (4, 3);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (5, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (6, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (7, 2);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (8, 3);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (9, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (10, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (11, 2);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (12, 3);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (13, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (14, 1);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (14, 2);
INSERT INTO tb_movie_genre (movie_id, genre_id) VALUES (14, 3);


INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-10', 'Filme muito legal', 0, 1, 1);
INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-11', 'Interessante, ele vai morrer', 1, 1, 1);
INSERT INTO tb_comment (date_comment, description, spoiler, movie_id, user_id) VALUES ('2022-10-11', 'Interessante, ele vai morrer', 1, 2, 1);

INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 5, 3, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-14', 4, 9, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 3, 4, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-14', 5, 7, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-16', 2.3, 3, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-14', 4.2, 1, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-15', 3, 2, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 2, 1, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 1, 4, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-12', 0, 2, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 3.5, 4, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 4.9, 4, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-10', 2, 2, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 2, 1, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 1, 4, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-12', 0, 11, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 3.5, 12, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 4.9, 11, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-10', 2, 14, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 2, 14, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-13', 1, 11, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-12', 0, 3, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 3.5, 4, 1);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-11', 4.9, 10, 2);
INSERT INTO tb_rating (date_rating, rating, movie_id, user_id) VALUES ('2022-10-10', 2, 13, 2);