function Summary({ expenses }) {
  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return (
    <div className="summary">
      <h2>Total Expenses</h2>
      <p>₹{totalAmount.toFixed(2)}</p>
    </div>
  );
}

export default Summary;