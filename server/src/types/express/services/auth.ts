import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (authHeader: string | undefined) => {
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return user;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

export const signToken = (_id: string, username: string, email: string) => {
  const payload = { _id, username, email };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
