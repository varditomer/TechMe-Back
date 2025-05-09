import { MongoClient, Db, Document } from "mongodb";

import "../config/load-env.js";

const uri = process.env.MONGODB_URI;
console.log(`uri:`, uri);
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const connectToDatabase = async () => {
  // Check the cached connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!dbName) {
    throw new Error("Please define the MONGODB_DB environment variable");
  }

  // Connect to cluster
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  // Set cache
  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

const getCollection = async <T extends Document>(collectionName: string) => {
  try {
    const { db } = await connectToDatabase();
    return db.collection<T>(collectionName);
  } catch (error) {
    console.error("Failed to get MongoDB collection:", error);
    throw error;
  }
};

const disconnect = async () => {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
};

const dbService = {
  connectToDatabase,
  getCollection,
  disconnect,
};

export default dbService;

