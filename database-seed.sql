CREATE TABLE test(
    id SERIAL,
    field varchar(255),
    CONSTRAINT test_id PRIMARY KEY (id)
);
INSERT INTO test(field) VALUES ('Testing PSQL DB');
