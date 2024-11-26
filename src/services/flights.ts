import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FLIGHT_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/";
const RAPID_API_KEY =
  process.env.REACT_APP_RAPIDAPI_KEY ||
  "";

export const flightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: FLIGHT_BASE_URL,

    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", RAPID_API_KEY);
      headers.set("x-rapidapi-host", "sky-scrapper.p.rapidapi.com");
      return headers;
    },
  }),
  tagTypes: ["Flights", "Airports"],
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: (data) => ({
        url: `v1/flights/searchFlights`,
        method: "GET",
        params: data,
      }),
      providesTags: ["Flights"], // This will invalidate the cache for Flights.
    }),
    getAirports: builder.query({
      query: (query) => `v1/flights/searchAirport?query=${query}&locale=en-US`,
      providesTags: ["Airports"],
    }),
  }),
});

export const { useGetFlightsQuery, useGetAirportsQuery } = flightsApi;
