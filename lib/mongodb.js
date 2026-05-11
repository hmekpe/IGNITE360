import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const hasPlaceholderCredentials = /<|>/.test(MONGODB_URI || '');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI || hasPlaceholderCredentials) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
export function isMongoConfigured() {
  return Boolean(MONGODB_URI) && !hasPlaceholderCredentials;
}
