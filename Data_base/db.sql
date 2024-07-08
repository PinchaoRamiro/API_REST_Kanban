-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,// el id es autoincremental y es la clave primaria
    username VARCHAR(255) UNIQUE NOT NULL,// el nombre de usuario debe ser unico
    email VARCHAR(255) UNIQUE NOT NULL,// el email debe ser unico
    password VARCHAR(255) NOT NULL // la contraseña no puede ser nula 
);

-- Crear tabla de columnas
CREATE TABLE columns (
    id SERIAL PRIMARY KEY,// el id es autoincremental y es la clave primaria
    user_id INTEGER NOT NULL,// el id del usuario no puede ser nulo
    title VARCHAR(255) NOT NULL,// el titulo no puede ser nulo
    position INTEGER,// la posicion puede ser nula
    CONSTRAINT fk_user // constrain sirve para crear una clave foranea
        FOREIGN KEY(user_id)// la clave foranea es user_id
        REFERENCES users(id)// la tabla users tiene una clave foranea a user_id
        ON DELETE CASCADE// si se elimina un usuario se elimina la columna
);

-- Crear tabla de tarjetas (cards)
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    column_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INTEGER,
    CONSTRAINT fk_column
        FOREIGN KEY(column_id)
        REFERENCES columns(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
