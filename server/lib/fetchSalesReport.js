// Example Use:

// import fetchSalesReport from "./fetchSalesReport.js"

// const filePath = "./"; // Specify the desired file path here
// const start_date = "2022-01-01"; // Specify the desired start date here (YYYY-MM-DD)
// const end_date = "2022-01-31"; // Specify the desired end date here (YYYY-MM-DD)

// fetchSalesReport(filePath, start_date, end_date);

import Bandcamp from "@nutriot/bandcamp-api";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const { BANDCAMP_CLIENT_ID, BANDCAMP_CLIENT_SECRET, BANDCAMP_BAND_ID } =
  process.env;

const api = new Bandcamp({
  id: BANDCAMP_CLIENT_ID,
  secret: BANDCAMP_CLIENT_SECRET,
});

const getFormattedTimestamp = () => {
  const timestamp = new Date();
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, "0");
  const day = String(timestamp.getDate()).padStart(2, "0");
  const hours = String(timestamp.getHours()).padStart(2, "0");
  const minutes = String(timestamp.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}`;
};

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const fetchSalesReport = async (filePath, start_date, end_date) => {
  const timestamp = getFormattedTimestamp();
  const modifiedFilePath = path.join(
    filePath,
    `sales_report_${timestamp}.json`
  );

  if (fs.existsSync(modifiedFilePath)) {
    console.log(`Sales report already saved to ${modifiedFilePath}`);
    return;
  }

  try {
    const credentials = await api.getClientCredentials();
    console.log("Client credentials obtained:"); //, credentials);

    if (credentials.error) {
      console.error("Multiple active grants, try again in a couple of minutes");
      return;
    }

    const expirationTime = credentials.expires_in;
    if (expirationTime <= 300) {
      console.log("Access token about to expire. Refreshing token...");
      const refreshedCredentials = await api.refreshToken(
        credentials.refresh_token
      );
      console.log("Token refreshed:"); //, refreshedCredentials);
    } else {
      console.log("Token OK, " + expirationTime + " seconds remaining");
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    console.log("Fetching sales report...");
    const salesReport = await api.getSalesReport(
      credentials.access_token,
      {
        band_id: BANDCAMP_BAND_ID,
        start_time: getFormattedDate(startDate),
        end_time: getFormattedDate(endDate),
        format: "json",
      },
      2
    );
    console.log("Sales report fetched:"); //, salesReport);

    console.log("Saving sales report to file...");
    fs.writeFileSync(modifiedFilePath, JSON.stringify(salesReport, null, 2));
    console.log(`Sales report saved to ${modifiedFilePath}`);
  } catch (error) {
    console.error("Error fetching or saving sales report:", error);
  }
};

export default fetchSalesReport;
