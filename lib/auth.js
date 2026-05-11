import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'ignite360-dev-secret';
const EXPIRY = process.env.JWT_EXPIRY || '7d';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

export function decodeToken(token) {
  return jwt.decode(token);
}
