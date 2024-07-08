// importa el modulo jwt para verificar el token
import jwt from 'jsonwebtoken';

// exporta la función authenticate
export const authenticate = (req, res, next) => {
  // verifica si existe el token en las cabeceras de la petición
  // si no existe, envía un error de acceso denegado
  // si existe, decodifica el token y lo asigna a la variable user
  // si el token es inválido, envía un error de acceso denegado
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
