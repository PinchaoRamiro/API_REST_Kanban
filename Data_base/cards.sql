--crear una card de un columna
INSERT INTO cards (column_id, user_id, title) VALUES ($1, $2, $3)

--actualizar una card
UPDATE cards SET title = $1 WHERE id = $2

--listar todas las cards
SELECT * FROM cards

--obtener una card por id
SELECT * FROM cards WHERE id = $1

--obtener todas las cards de un usuario
SELECT * FROM cards WHERE user_id = $1

--eliminar una card
DELETE FROM cards WHERE id = $1

--obtener todas las cards de una columna
SELECT * FROM cards WHERE column_id = $1


