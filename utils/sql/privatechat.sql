DROP TABLE IF EXISTS privatechat;

CREATE TABLE privatechat
(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT null,
    receiver_id INTEGER REFERENCES users(id) NOT null,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (1, 2, 'hey there it´s user number 1' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'hey I´m user number 2' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (1, 2, 'number 1 testing the chat' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'number 3 also wants to test the chat' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'number 4 saying hello' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (1, 2, 'Hi again from number 1 ');

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'How is everyone doing asks number 3' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'number 4 says great!!' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (2, 1, 'number 2 is having a great time' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (1, 2, 'number 5 just joined the chat' );

INSERT INTO privatechat
    (sender_id, receiver_id, text)
VALUES
    (1, 2, 'number 7 here!!' );