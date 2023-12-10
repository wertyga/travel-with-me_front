import { baseApi } from '@/app/query';
import {
  GetPaymentSheetRequest,
  GetPaymentSheetResponse,
} from '@/types/payment';

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPaymentSheet: build.mutation<
      GetPaymentSheetResponse,
      GetPaymentSheetRequest
    >({
      query: params => ({
        method: 'get',
        url: '/payments/sheet-create',
        params,
      }),
    }),
  }),
});

export const { useGetPaymentSheetMutation } = authApi;
