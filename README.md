# API REST para Kanban Board

## Descripción

Esta es una API REST para un tablero Kanban, que permite a los usuarios gestionar columnas y tarjetas. La API está construida utilizando Node.js, Express.js, PostgreSQL y JWT para la autenticación.

## Características

- Creación, lectura, actualización y eliminación (CRUD) de usuarios
- Autenticación y autorización utilizando JWT
- CRUD de columnas y tarjetas
- Validación de datos con Zod
- Documentación detallada en la raíz de la API

## Tecnologías

- Node.js
- Express.js
- PostgreSQL
- JWT para autenticación
- Zod para validación de datos

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tuusuario/kanban-api.git
    cd kanban-api
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```plaintext
    PGUSER=your_supabase_user
    PGHOST=your_supabase_host
    PGDATABASE=your_supabase_database
    PGPASSWORD=your_supabase_password
    PGPORT=5432
    JWT_SECRET=your_jwt_secret
    ```

4. Ejecuta las migraciones de la base de datos si es necesario:
    ```bash
    npm run migrate
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```

2. La documentación de la API está disponible en la raíz (`/`) de tu servidor en ejecución.

### Endpoints

#### Usuarios

- **POST /users**: Crear un nuevo usuario
- **POST /login**: Iniciar sesión de usuario
- **GET /users**: Listar todos los usuarios
- **PUT /users/email**: Actualizar el email del usuario
- **PUT /users/password**: Actualizar la contraseña del usuario
- **DELETE /users**: Eliminar un usuario

#### Columnas

- **GET /columns**: Listar todas las columnas
- **POST /columns**: Crear una nueva columna
- **PUT /columns/:id**: Actualizar una columna
- **DELETE /columns/:id**: Eliminar una columna

#### Tarjetas

- **GET /cards**: Listar todas las tarjetas
- **POST /cards**: Crear una nueva tarjeta
- **PUT /cards/:id**: Actualizar una tarjeta
- **DELETE /cards/:id**: Eliminar una tarjeta

## Autenticación

Esta API utiliza JWT para autenticación. Asegúrate de incluir el token JWT en las cabeceras de las solicitudes protegidas.

## Ejemplo de Solicitud

### Crear Usuario
```bash
curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123"
    }'
