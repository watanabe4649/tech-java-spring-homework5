DROP TABLE IF EXISTS ramen_table;

CREATE TABLE IF NOT EXISTS ramen_table
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    shop_name VARCHAR(100),
    evaluation INT,
    PRIMARY KEY(id)
);