
DROP TABLE IF EXISTS chatroom;

CREATE TABLE chatroom(
    id SERIAL PRIMARY KEY,
    message VARCHAR(500) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



INSERT INTO chatroom (message, user_id)
VALUES ('hello everyone', 1);

INSERT INTO chatroom (message, user_id)
VALUES ('What is up', 2);

INSERT INTO chatroom (message, user_id)
VALUES ('I love coding', 3);

INSERT INTO chatroom (message, user_id)
VALUES ('Does anyone know FORTRAN?', 4);

INSERT INTO chatroom (message, user_id)
VALUES ('a/s/l?', 5);

INSERT INTO chatroom (message, user_id)
VALUES ('What is the best code academy in Berlin?', 6);

INSERT INTO chatroom (message, user_id)
VALUES ('Hmm...', 11);

INSERT INTO chatroom (message, user_id)
VALUES ('My friend told me about one.. I think it is called Spicy School or something', 7);

INSERT INTO chatroom (message, user_id)
VALUES ('Pepper University? ', 8);

INSERT INTO chatroom (message, user_id)
VALUES ('Cinnamon College?', 9);

INSERT INTO chatroom (message, user_id)
VALUES ('It''s Italian Herb Institute. I''m sure of it.', 10);
