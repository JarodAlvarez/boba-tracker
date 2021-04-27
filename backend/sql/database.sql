CREATE DATABASE bobabase;

--\c into bobabase

CREATE TABLE boba_entries(
    boba_id SERIAL PRIMARY KEY,
    price FLOAT,
    drinkname VARCHAR(255),
    description VARCHAR(255)
);