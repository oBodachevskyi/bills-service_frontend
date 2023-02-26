import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../assets/constants';
import { PayerType } from '../../types/data-type';
  
  export const payersApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL ,
    }),
    reducerPath: 'payersApi',
    tagTypes: ['peyers'],
    endpoints: (build) => ({
      getAllPayers: build.query<PayerType[], string>({
        query: () => {         
          return {
            url: 'api/payers',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
           
          };
        },
      }),
    }),
  });
  
  export const {
    useLazyGetAllPayersQuery,
  } = payersApi;
  