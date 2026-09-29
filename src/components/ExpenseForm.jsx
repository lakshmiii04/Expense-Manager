import { useState } from "react";

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onCancelEdit }) {
  const [title, setTitle] = useState(editingExpense?.title || "");
  const [amount, setAmount] = useState(editingExpense?.amount || "");
  const [category, setCategory] = useState(editingExpense?.category || "");
  const [date, setDate] = useState(editingExpense?.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const expense = {
      id: editingExpense?.id || Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    if (editingExpense) {
      onUpdateExpense(expense);
    } else {
      onAddExpense(expense);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>

      {editingExpense && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ExpenseForm;