--crear una coluna
INSERT INTO columns (user_id, title) VALUES ($1, $2)

--actualizar una coluna
UPDATE columns SET title = $1 WHERE id = $2

--listar todas las columnas
SELECT * FROM columns

--obtener una columna por id
SELECT * FROM columns WHERE id = $1

--obtener todas las columnas de un usuario
SELECT * FROM columns WHERE user_id = $1

--eliminar una coluna
DELETE FROM columns WHERE id = $1

