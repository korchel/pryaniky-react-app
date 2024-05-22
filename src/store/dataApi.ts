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
  tagTypes: ['data'],
  endpoints: (builder) => ({
    getData: builder.query<IData[], void>({
      query: () => ({
        url: '/get',
      }),
      providesTags: ['data'],
      transformResponse: (response: IResponse): IData[] => response.data,
    }),

    createData: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['data'],
    }),
    
    deleteData: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['data'],
    }),

    updateData: builder.mutation({
      query: ({id, data}) => ({
        url: `/set/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['data'],
    }),
  }),
});

export const {
  useGetDataQuery,
  useDeleteDataMutation,
  useCreateDataMutation,
  useUpdateDataMutation
} = dataApi;