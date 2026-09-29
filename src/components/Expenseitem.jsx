function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-details">
        <h3>{expense.title}</h3>

        <p>
          <strong>Category:</strong> {expense.category}
        </p>

        <p>
          <strong>Date:</strong> {expense.date}
        </p>
      </div>

      <div className="expense-actions">
        <span className="expense-amount">
          ₹{expense.amount.toFixed(2)}
        </span>

        <button onClick={() => onEdit(expense)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;