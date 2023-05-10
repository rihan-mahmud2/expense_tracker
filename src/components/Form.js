import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  postTransaction,
  upadateTransaction,
} from "../features/Transctions/transactionsSlice";

const Form = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const { isLoading, isError, editing } = useSelector(
    (state) => state.transactions || {}
  );
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  useEffect(() => {
    const { id, name, type, amount } = editing;

    if (id) {
      setEditingMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditingMode(false);
      reset();
    }
  }, [editing]);

  const handleCreateTransaction = (e) => {
    e.preventDefault();

    dispatch(
      postTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    dispatch(
      upadateTransaction({
        id: editing?.id,
        data: {
          name: name,
          type: type,
          amount: amount,
        },
      })
    );
    reset();
    setEditingMode(false);
  };

  const handleCancel = () => {
    reset();
    setEditingMode(false);
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form
        onSubmit={
          editingMode ? handleUpdateTransaction : handleCreateTransaction
        }
      >
        <div className="form-group">
          <label>Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Enter title"
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter Amount"
            name="amount"
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editingMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <h3 className="error">There was an error occured</h3>
        )}
      </form>

      {editingMode && (
        <button onClick={handleCancel} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
