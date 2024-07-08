//validacion de datos
import { z } from 'zod';

export const userSchema = z.object({
    username: z
      .string() 
      .min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  });

// validar login 
export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  });


// validar registro
export const registerSchema = z.object({
    username: z
      .string() 
      .min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  });