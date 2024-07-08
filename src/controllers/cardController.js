import pool from '../db.js';
import z from 'zod';

// validar los datos de la tarjeta
const cardSchema = z.object({
        column_id: z.number().int().positive(),
        user_id: z.number().int().positive(),
        title: z.string().min(1).max(255),
        description: z.string().optional(),
    });

// Obtener las tarjetas por ID de la columna
export const getCardsByColumnId = async (req, res) => {
    const { column_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM cards WHERE column_id = $1',
            [ column_id ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Crear una nueva tarjeta
export const createCard = async (req, res) => {
    const { title, column_id, description, user_id } = req.body;

    if (!title || !column_id || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if(!cardSchema.safeParse(req.body).success) {
        return res.status(400).json({ error: 'Invalid card data' });
    }
  
    try {
      // Validar datos con Zod
      cardSchema.parse({ column_id, user_id, title, description });
  
      // Ejecutar la consulta de inserción
      const result = await pool.query(
        'INSERT INTO cards (title, column_id, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, column_id, description, user_id]
      );
  
      // Verificar que la inserción fue exitosa
      if (result.rows.length === 0) {
        return res.status(500).json({ error: 'Failed to create card' });
      }
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Manejo de errores de validación
        return res.status(400).json({ error: error.errors });
      } else {
        // Manejo de otros errores
        console.error('Error creating card:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
};

// Actualizar una tarjeta por ID
export const updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!z.string().safeParse(title).success) {
        return res.status(400).json({ error: 'Invalid title' });
    }

    try {
        if(!description){
            const result = await pool.query(
                'UPDATE cards SET title = $1 WHERE id = $2 RETURNING *',
                [title, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Card not found' });
            }
            res.status(200).json(result.rows[0]);
        }else{
            const result = await pool.query(
                'UPDATE cards SET title = $1, description = $2 WHERE id = $3 RETURNING *',
                [title, description, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Card not found' });
            }
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Eliminar una tarjeta por ID
export const deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM cards WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}