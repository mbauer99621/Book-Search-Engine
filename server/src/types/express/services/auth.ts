import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request } from 'express';
dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = ({req}:{req:Request}) => {
  console.log("Hello");


  let token = req.body.token || req.query.token || req.headers.authorization;
  if(!token) {
    return req;
  }
  if(req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }


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
