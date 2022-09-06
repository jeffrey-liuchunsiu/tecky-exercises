CREATE TABLE memos (
    id SERIAL primary key,
    content TEXT,
    image VARCHAR(255),
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