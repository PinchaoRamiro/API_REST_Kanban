--crear un usuario
INSERT INTO users (username, email, password) VALUES ($1, $2, $3)

--eliminar un usuario
DELETE FROM users WHERE email = $1

--actualizar un usuario
UPDATE users SET password = $1 WHERE email = $2

--listar todos los usuarios
SELECT * FROM users

--obtener un usuario por email
SELECT * FROM users WHERE email = $1

--obtener un usuario por id
SELECT * FROM users WHERE id = $1

--obtener un usuario por username
SELECT * FROM users WHERE username = $1

--obtener un usuario por email y password
SELECT * FROM users WHERE email = $1 AND password = $2
