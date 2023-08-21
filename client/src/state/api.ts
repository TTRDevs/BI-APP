/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
//   reducerPath: 'main',
//   tagTypes: ['Kpis'],
//   endpoints: (build) => ({
//     getKpis: build.query<Array<GetKpisResponse>, void>({
//       query: () => 'kpi/kpis/',
//       providesTags: ['Kpis'],
//       // This function will be called when the request is made to the server.
//       fetch: async ({ query }) => {
//         // Make the request to the server
//         const response = await fetch(query, {
//           method: 'GET',
//           // Add any additional headers or options you need
//         });

//         // Check if the request was successful
//         if (response.ok) {
//           // The request was successful, so return the JSON response
//           return response.json();
//         }

//         // The request was not successful, so throw an error
//         throw new Error('Something went wrong');
//       },
//     }),
//   }),
// });

// export const { useGetKpisQuery } = api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: ['Kpis'],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => 'kpi/kpis/',
      providesTags: ['Kpis'],
    }),
  }),
});

export const { useGetKpisQuery } = api;
