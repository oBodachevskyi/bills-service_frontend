import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../assets/constants';
import { FilterParamsType } from '../../types/bills-list';
import { BillType } from '../../types/data-type';

export const billsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  reducerPath: 'billsApi',
  tagTypes: ['bills'],
  endpoints: (build) => ({
    getAllBills: build.query<BillType[], FilterParamsType>({
      query: (params) => {
        const {payer, game} = params;
        const payload =
          !payer && !game
            ? {}
            : !!payer && !game
            ? { payer }
            : !payer && !!game
            ? { game }
            : { ...params };
        const body = JSON.stringify(payload);
        return {
          url: 'api/bills',
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => {
                return {
                  type: 'bills' as const,
                  id: item._id,
                };
              }),
              { type: 'bills', id: 'LIST' },
            ]
          : [{ type: 'bills', id: 'LIST' }],
    }),

    addNewBill: build.mutation({
      query({game, payer, amount, currency }) {
        const payload = {
          game: game,
          payer: payer,
          amount: Number(amount),
          currency: currency,
        };
      
        const body = JSON.stringify(payload);
        return {
          url: 'api/bills',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        };
      },
      invalidatesTags: [{ type: 'bills' }],
    }),

    updatePaymentStatus: build.mutation({
      query(bill) {        
        const payload = {
          id: bill.id,
          params: {
            isPaid: bill.isPaid,
            datePaid: new Date()
          }
        };
        const body = JSON.stringify(payload);
        return {
          url: `api/bills/update/${bill.id}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        };
      },
      invalidatesTags: [{ type: 'bills' }],
    })
  }),
});

export const {
  useGetAllBillsQuery,
  useAddNewBillMutation,
  useUpdatePaymentStatusMutation,
} = billsApi;
