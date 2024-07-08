// src/controllers/userController.js
import bcrypt from 'bcrypt';
import pool from '../db.js';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema, userSchema } from '../Schemas/userSchemas.js';

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    registerSchema.parse({ username, email, password });
    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    loginSchema.parse({ email, password });

    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7h' }
    );

    console.log({token: token});

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo se envía a través de HTTPS en producción
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  // Validar los datos de inicio de sesión
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    loginSchema.parse({ email, password });
    // Extraer usuario de la base de datos
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Eliminar el usuario
    await pool.query('DELETE FROM users WHERE email = $1', [email]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//actualizar el email del usuario
export const updateUserEmail = async (req, res) => {
  // sustrae el email y el nuevo email del body
  const { email, newEmail, password} = req.body;

  // Validar los datos de inicio de sesión
  if (!email || !newEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    userSchema.pick({ email: true, password: true }).parse({ email, password });
    // Verificar si el usuario existe con el email que se le desea cambiar
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    } 

    // Actualizar el email del usuario
    const user = userResult.rows[0];
    // Verificar si el nuevo email ya existe
    if (user.email === newEmail) {
      return res.status(400).json({ error: 'New email must be different from old email' });
    }
    // subir los nuevos datos a la base de datos
    await pool.query('UPDATE users SET email = $1 WHERE email = $2', [newEmail, email]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

//actualizar el password del usuario
export const updateUserPassword = async (req, res) => {
  // extrae el email, el password y el nuevo password del body
  const { email, password, newPassword } = req.body;

  // Validar los datos de inicio de sesión
  if (!email || !password || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try { 
    userSchema.pick({ email: email, password: true, username: true });
    // Verificar si el usuario existe con el email que se le desea cambiar
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    } 

    // Verificar la contraseña
    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Actualizar el password del usuario
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}



