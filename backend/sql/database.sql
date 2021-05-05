CREATE DATABASE bobabase;

--\c into bobabase

CREATE TABLE boba_entries(
    purchase_date DATE,
    drinkname VARCHAR(255),
    price FLOAT,
    sweetness FLOAT CHECK (sweetness >= 0 AND sweetness <= 1));