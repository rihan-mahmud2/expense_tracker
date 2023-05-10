import { useEffect } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../features/Transctions/transactionsSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  //decide what to render
  let content = "";

  if (!isLoading && isError) {
    content = <p className="error">There was an error occured</p>;
  }

  if (isLoading) content = <p>Loading...</p>;

  if (!isError && !isLoading && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  if (!isError && !isLoading && transactions?.length === 0)
    content = <p>There is no transactions found</p>;

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
