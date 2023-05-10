import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/Transctions/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionSlice,
  },
});
