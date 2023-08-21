import { MongoClient } from 'mongodb';
import connectToDatabase from '../lib/connectToDatabase.js';
import { getMonthYearKPIs } from './pipelines.mjs';

// Function to calculate KPIs
async function calculateKPIs() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Calculate the KPIs
    const monthYearKPIsData = await getMonthYearKPIs(db);

    // Iterate over the KPI data
    for (const kpiData of monthYearKPIsData) {
      const { year, month } = kpiData._id;

      // Check if the document already exists using the year and month combination
      const existingDocument = await db
        .collection('MonthYearKPIs')
        .findOne({ _id: { year, month } });

      if (existingDocument) {
        // Document already exists, update it
        await db
          .collection('MonthYearKPIs')
          .updateOne({ _id: { year, month } }, { $set: { ...kpiData } });
        console.log(`Document updated for year ${year} and month ${month}`);
      } else {
        // Document doesn't exist, create a new one
        await db.collection('MonthYearKPIs').insertOne(kpiData);
        console.log(`Document created for year ${year} and month ${month}`);
      }
    }

    // Close the connection to the database
    await db.client.close();
    console.log('Database connection closed');

    // Return the KPI data
    // return monthYearKPIsData;
  } catch (error) {
    console.error('Error calculating KPIs:', error);
    throw error;
  }
}

export default calculateKPIs;
