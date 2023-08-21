import express from 'express';
import { MongoClient } from 'mongodb';
import connectToDatabase from '../lib/connectToDatabase.js';

const router = express.Router();

router.get('/kpis', async (req, res) => {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Retrieve the 'MonthYearKPIs' collection
    const monthYearKPIsCollection = db.collection('MonthYearKPIs');

    // Retrieve all documents from the collection
    const monthYearKPIs = await monthYearKPIsCollection.find({}).toArray();

    // Close the connection to the database
    await db.client.close();
    console.log('Database connection closed');

    // Send the 'MonthYearKPIs' collection as a JSON response to the frontend
    res.json(monthYearKPIs);
  } catch (error) {
    // Handle any errors that occurred during the retrieval
    console.error('Error retrieving MonthYearKPIs:', error);
    res.status(500).json({ error: 'Failed to retrieve MonthYearKPIs' });
  }
});

export default router;
