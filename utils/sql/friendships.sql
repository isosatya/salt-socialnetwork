DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships
(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT null,
    receiver_id INTEGER REFERENCES users(id) NOT null,
    accepted BOOLEAN DEFAULT FALSE NOT NULL
)