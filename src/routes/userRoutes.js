// src/routes/userRoutes.js
import express from 'express';
import { 
    createUser,
    loginUser,
    deleteUser,
    updateUserEmail,
    updateUserPassword,
 } from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();  

// Ruta para crear un nuevo usuario (registro)
router.post('/user/register', createUser);

// Ruta para el inicio de sesión
router.post('/user/login', loginUser);

//Ruta para eliminar usuario
router.delete('/user/delete', authenticate, deleteUser);

//Ruta para actualizar email de usuario
router.put('/user/update/email', authenticate, updateUserEmail);

//Ruta para actualizar password de usuario
router.put('/user/update/password', authenticate, updateUserPassword);

export default router;
