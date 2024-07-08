// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import columnRoutes from './routes/columnRoutes.js';
import cardRoutes from './routes/cardRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configura Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);// ruta para los usuarios
app.use('/api', columnRoutes);// ruta para las columnas
app.use('/api', cardRoutes);// ruta para las tarjetas

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
