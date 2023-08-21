import { MongoClient } from 'mongodb';

// Function to get the profits
export async function getMonthYearKPIs(db) {
  try {
    // Create the pipeline
    const pipeline = [
      {
        $match: {
          paid_to: 'Bandcamp',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          total_revenue: { $sum: '$sub_total' },
          total_expenses: { $sum: '$transaction_fee' },
          total_profit: { $sum: '$amount_you_received' },
          total_item_quantity: { $sum: '$quantity' },
          total_transactions: { $count: {} },
        },
      },
    ];
    // Execute the pipeline
    const MonthYearKPIs = await db
      .collection('BandcampSalesReport')
      .aggregate(pipeline)
      .toArray();

    return MonthYearKPIs;
  } catch (error) {
    console.error('Error getting profits:', error);
    throw error;
  }
}
