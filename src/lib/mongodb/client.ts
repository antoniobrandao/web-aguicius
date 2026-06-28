import { MongoClient } from "mongodb";

declare global {
  var __aguiciusMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }
  return uri;
}

export function getMongoClient() {
  if (!globalThis.__aguiciusMongoClientPromise) {
    const client = new MongoClient(getMongoUri());
    globalThis.__aguiciusMongoClientPromise = client.connect();
  }

  return globalThis.__aguiciusMongoClientPromise;
}
