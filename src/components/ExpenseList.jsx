import ExpenseItem from "./ExpenseItem.jsx";
function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;