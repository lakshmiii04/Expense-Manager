import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SearchFilter from "./components/SearchFilter";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add expense
  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense,
    ]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Start editing
  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  // Update expense
  const updateExpense = (updatedExpense) => {
    setExpenses((previousExpenses) =>
      previousExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingExpense(null);
  };

  // Search + category filtering
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Expense Manager</h1>
        <p>Track and manage your daily expenses easily.</p>
      </header>

      <main className="container">
        <Summary expenses={expenses} />

        <ExpenseForm
          onAddExpense={addExpense}
          editingExpense={editingExpense}
          onUpdateExpense={updateExpense}
          onCancelEdit={cancelEdit}
        />

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={editExpense}
          onDelete={deleteExpense}
        />
      </main>
    </div>
  );
}

export default App;