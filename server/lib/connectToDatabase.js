import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 9000;
const TTReksDB = 'TTReks';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(`${MONGO_URL}:${PORT}`, {
      useUnifiedTopology: true,
      writeConcern: { w: 'majority' }, // Set the write concern mode to 'majority'
    });

    const db = await client.db(TTReksDB); // Get the database object
    console.log(`Connected successfully to MongoDB on port ${PORT}`);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
}

export default connectToDatabase;
