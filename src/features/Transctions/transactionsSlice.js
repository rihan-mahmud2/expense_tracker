import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "./transactionsAPI";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
  editing: {},
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
  }
);
export const removeTransaction = createAsyncThunk(
  "transactions/removeTransactions",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);
export const postTransaction = createAsyncThunk(
  "transactions/postTransaction",
  async (item) => {
    const transaction = await addTransaction(item);
    return transaction;
  }
);

export const upadateTransaction = createAsyncThunk(
  "transactions/upadateTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(postTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(upadateTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(upadateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );

        state.transactions[index] = action.payload;
      })
      .addCase(upadateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        const filteredTransactions = state.transactions.filter(
          (t) => t.id !== action.meta?.arg
        );
        state.transactions = filteredTransactions;
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;

export const { editActive, editInActive } = transactionSlice.actions;
