import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { IData } from '../types';


interface IResponse {
  data: IData[];
  [key: string]: any;
}

export const dataApi = createApi({
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs',
    prepareHeaders: (headers) => {
      headers.set('x-auth', Cookies.get('token') as string);
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query<IData[], void>({
      query: () => ({
        url: '/get',
      }),
      transformResponse: (response: IResponse): IData[] => response.data,
    })
  })
});

export const { useGetDataQuery } = dataApi;