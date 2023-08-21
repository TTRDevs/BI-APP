import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';

// Define the type for the API response data
type KpiData = {
  _id: {
    year: number;
    month: number;
  };
  total_revenue: number;
  total_expenses: number;
  total_profit: number;
  total_item_quantity: number;
  total_transactions: number;
}[];

type Props = {};

function Row1(props: Props) {
  // Instantiate the API query using the useGetKpisQuery hook
  const { data, isLoading, isError } = useGetKpisQuery<KpiData>();

  // Handle the different states of the API request and display the data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }

  return (
    <>
      <DashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="total_expenses" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_profit" stroke="#8884d8" />
            <Line
              type="monotone"
              dataKey="total_item_quantity"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* <DashboardBox gridArea="c" /> */}
    </>
  );
}

export default Row1;
