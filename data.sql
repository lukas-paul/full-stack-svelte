DROP TABLE IF EXISTS posts;


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    genre VARCHAR NOT NULL,
    headline VARCHAR NOT NULL,
    post VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (username, city, genre, headline, post) VALUES (
    'Bob',
    'Berlin',
    'Rock',
    'Just looking for peeps',
    'I want to start a Band!'
);