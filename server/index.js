// index.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/apiController.js';
import { MongoClient } from 'mongodb';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/kpi', router);

/* START SERVER */
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${process.env.PORT || 3000}`);
});

/* RUN TO FETCH BANDCAMP SALES REPORT */
// import fetchSalesReport from './lib/fetchSalesReport.js';
// const filePath = './data/'; // Specify the desired file path here
// const start_date = '2021-01-01'; // Specify the desired start date here (YYYY-MM-DD)
// const end_date = '2022-01-01'; // Specify the desired end date here (YYYY-MM-DD)
// fetchSalesReport(filePath, start_date, end_date);

/* RUN TO UPDATE THE DB */
// import updateDatabase from './lib/updateDatabase.js';
// updateDatabase('./data/sales_report_2023-08-10-02-20.json');

/* RUN TO CALCULATE THE KPIS */
// import calculateKPIs from './models/calculateKPIs.js';
// const KPIs = await calculateKPIs();
// console.log(KPIs);
