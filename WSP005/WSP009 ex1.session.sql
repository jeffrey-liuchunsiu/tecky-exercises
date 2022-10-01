CREATE TABLE memos (
    id SERIAL primary key,
    content TEXT,
    image VARCHAR(255),
    count integer,
    created_at TIMESTAMP default now(),
    updated_at TIMESTAMP default now()
);
CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(255) not null,
    password VARCHAR(255) not null,
    created_at TIMESTAMP default now(),
    updated_at TIMESTAMP default now()
);
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    memo_id integer,
    FOREIGN KEY (memo_id) REFERENCEs memos(id)
);
-- CREATE TABLE Persons (
-- 	id SERIAL PRIMARY KEY,
-- 	username varchar(255) NOT NULL, 
--     UNIQUE (username)
-- );