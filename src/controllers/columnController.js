// src/controllers/columnController.js
import pool from '../db.js';
import z from 'zod';

// Obtener las columnas por ID de usuario
export const getColumnByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM columns WHERE user_id = $1',
        [user_id]
      );
      console.log(result.rows + ' ' + user_id);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Column not found' });
      }
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

// Crear una nueva columna
export const createColumn = async (req, res) => {
  const { title, user_id } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!z.string().safeParse(user_id).success) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  if (!z.string().safeParse(title).success) {
    return res.status(400).json({ error: 'Invalid title' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO columns (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Actualizar una columna por ID
export const updateColumn = async (req, res) => {
  const { user_id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'UPDATE columns SET title = $1 WHERE user_id = $2 RETURNING *',
      [title, user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Column not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Eliminar una columna por user_id
export const deleteColumn = async (req, res) => {
  const { user_id } = req.params;

  //verficar que user-id sea un numero
  if (!z.string().safeParse(user_id).success) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  try {
    const result = await pool.query('DELETE FROM columns WHERE user_id = $1 RETURNING *', [user_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Column not found' });
    }
    res.status(200).json({ message: 'Column deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
