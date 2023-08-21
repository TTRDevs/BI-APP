// import { MongoClient } from 'mongodb';
// import connectToDatabase from './connectToDatabase.js';
// import fs from 'fs';
// import schemaDB from '../models/schemaDB.js';

// async function updateDatabase(jsonFile) {
//   try {
//     // Connect to the database
//     const db = await connectToDatabase();

//     // Read the JSON file
//     let data;
//     try {
//       data = fs.readFileSync(jsonFile, 'utf8');
//     } catch (error) {
//       console.error('Error reading JSON file:', error);
//       throw error;
//     }

//     // Check if the data is empty
//     if (data.length === 0) {
//       console.log('JSON file is empty.');
//       return;
//     }

//     // Parse the JSON data
//     const parsedData = JSON.parse(data);

//     // Get the unique_bc_ids
//     const uniqueBcIds = Object.keys(parsedData);

//     // Create an array of documents
//     const parsedDataArray = [];
//     for (const uniqueBcId of uniqueBcIds) {
//       // Get the data object
//       const dataObject = parsedData[uniqueBcId];

//       // Add the unique_bc_id field to the document
//       const document = {
//         unique_bc_id: uniqueBcId,
//         ...dataObject,
//       };

//       // Validate the document against the schema
//       const schema = schemaDB.schema;
//       for (const fieldName in schema) {
//         if (!document.hasOwnProperty(fieldName)) {
//           throw new Error(
//             `The document is missing the required field "${fieldName}".`,
//           );
//         }

//         const fieldType = schema[fieldName];
//         if (typeof document[fieldName] !== fieldType) {
//           throw new Error(
//             `The value of the "${fieldName}" field is not of the correct type "${fieldType}".`,
//           );
//         }
//       }

//       parsedDataArray.push(document);
//     }

//     // Insert the documents into the collection
//     await db.collection('sales').insertMany(parsedDataArray);

//     // Close the connection to the database
//     await db.client.close();
//   } catch (error) {
//     console.error('Error updating database:', error);
//     throw error;
//   }
// }

// export default updateDatabase;

import { MongoClient } from 'mongodb';
import connectToDatabase from './connectToDatabase.js';
import fs from 'fs';
import schemaDB from '../models/schemaDB.js';

async function updateDatabase(jsonFile) {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Read the JSON file
    let data;
    try {
      data = fs.readFileSync(jsonFile, 'utf8');
    } catch (error) {
      throw error;
    }

    // Check if the data is empty
    if (data.length === 0) {
      console.log('JSON file is empty.');
      return;
    }

    // Parse the JSON data
    const parsedData = JSON.parse(data);

    // Get the unique_bc_ids
    const uniqueBcIds = Object.keys(parsedData);

    // Create counters for transactions uploaded and updated
    let numTransactionsUploaded = 0;
    let numTransactionsUpdated = 0;

    // Create arrays to store the uploaded and updated transactions
    const uploadedTransactions = [];
    const updatedTransactions = [];

    // Create an array of promises
    const promises = [];
    const { schema } = schemaDB;

    for (const uniqueBcId of uniqueBcIds) {
      const dataObject = parsedData[uniqueBcId];
      const filter = { unique_bc_id: uniqueBcId };

      const updateDocument = {
        $set: {
          ...dataObject,
          date: new Date(dataObject.date),
        },
      };

      const options = { upsert: true }; // Insert if not found

      const promise = db
        .collection('BandcampSalesReport')
        .updateOne(filter, updateDocument, options)
        .then((result) => {
          if (result.upsertedCount === 1) {
            numTransactionsUploaded++;
            uploadedTransactions.push(uniqueBcId);
          } else if (result.modifiedCount === 1) {
            numTransactionsUpdated++;
            updatedTransactions.push(uniqueBcId);
          }
        });

      promises.push(promise);
    }

    // Wait for all promises to finish
    await Promise.all(promises);

    // Display the total number of transactions uploaded and updated
    console.log(
      `Total transactions uploaded: ${numTransactionsUploaded}, Updated: ${numTransactionsUpdated}`,
    );

    // Display the list of uploaded transactions
    if (numTransactionsUploaded > 0) {
      console.log('Uploaded transactions:');
      console.log(uploadedTransactions);
    }

    // Display the list of updated transactions
    if (numTransactionsUpdated > 0) {
      console.log('Updated transactions:');
      console.log(updatedTransactions);
    }

    // Close the connection to the database
    await db.client.close();
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
}

export default updateDatabase;
