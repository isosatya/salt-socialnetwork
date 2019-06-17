DROP TABLE IF EXISTS chats;

CREATE TABLE chats
(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT null,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chats
    (sender_id, text)
VALUES
    (1, 'hey there it´s user number 1' );

INSERT INTO chats
    (sender_id, text)
VALUES
    ("2", 'hey I´m user number 2' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (1, 'number 1 testing the chat' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (3, 'number 3 also wants to test the chat' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (4, 'number 4 saying hello' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (1, 'Hi again from number 1 ');

INSERT INTO chats
    (sender_id, text)
VALUES
    (3, 'How is everyone doing asks number 3' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (4, 'number 4 says great!!' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (2, 'number 2 is having a great time' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (5, 'number 5 just joined the chat' );

INSERT INTO chats
    (sender_id, text)
VALUES
    (7, 'number 7 here!!' );
    
