import React from "react";
import editImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../features/Transctions/transactionsSlice";

const Transaction = ({ transaction }) => {
  const { id, amount, type, name } = transaction || {};
  const dispatch = useDispatch();

  const handleEditing = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEditing}>
          <img alt="edit" className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" alt="deletedImg" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
