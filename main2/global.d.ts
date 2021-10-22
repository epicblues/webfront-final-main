import { MongoClient } from "mongodb";

declare module globalThis {
  let _mongoClientPromise: Promise<MongoClient>;
}
