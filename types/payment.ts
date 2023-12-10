export type GetPaymentSheetRequest = {
  subscription: string;
};
export type GetPaymentSheetResponse = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
};
