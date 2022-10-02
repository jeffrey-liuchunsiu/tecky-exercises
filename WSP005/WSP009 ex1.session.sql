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
EXPLAIN ANALYZE with users_that_like_more_memos as (
    select users.id as user_id,
        username,
        count(likes.id) as likes_count
    from users
        inner join likes on users.id = likes.user_id
    group by users.id
    having count(likes.id) >= 50
)
select username,
    content
from memos
    inner join likes on likes.memo_id = memos.id
    inner join users_that_like_more_memos on likes.user_id = users_that_like_more_memos.user_id
order by memos.created_at desc;
EXPLAIN ANALYZE CREATE MATERIALIZED VIEW users_that_like_more_memos_memos_view AS with users_that_like_more_memos as (
    select users.id as user_id,
        username,
        count(likes.id) as likes_count
    from users
        inner join likes on users.id = likes.user_id
    group by users.id
    having count(likes.id) >= 50
)
select username,
    content
from memos
    inner join likes on likes.memo_id = memos.id
    inner join users_that_like_more_memos on likes.user_id = users_that_like_more_memos.user_id
order by memos.created_at desc;
EXPLAIN ANALYZE
select username,
    content
from users_that_like_more_memos_memos_view;