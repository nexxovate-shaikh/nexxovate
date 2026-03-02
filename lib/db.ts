import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!; // ✅ tell TypeScript it's defined

let client: MongoClient;
let db: Db;

export async function getDB(): Promise<Db> {

  if (db) return db;

  client = new MongoClient(uri);

  await client.connect();

  db = client.db("nexxovate");

  return db;

}