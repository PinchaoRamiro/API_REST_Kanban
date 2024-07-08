// src/routes/columnRoutes.js
import express from 'express';
import {
  getColumnByUserId ,
  createColumn,
  updateColumn,
  deleteColumn
} from '../controllers/columnController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/columns/:user_id', authenticate, getColumnByUserId);//obtener las columnas de un usuario
router.post('/columns', authenticate, createColumn);//crear una nueva columna
router.put('/columns/:user_id', authenticate, updateColumn);//actualizar una columna
router.delete('/columns/:user_id', authenticate, deleteColumn);//eliminar una columna

export default router;
