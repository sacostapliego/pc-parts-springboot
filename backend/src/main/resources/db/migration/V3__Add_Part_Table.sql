CREATE TABLE part (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    brand TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);