import { ClsTransactionBusiness } from "./BusinessLayer/Transactions/ClsTransactionBusiness.js";
let transactionObj = new ClsTransactionBusiness();
let descriptionInput = document.getElementById(
  "textDescription"
);
let amountInput = document.getElementById("textAmount");
let addTransactionButton = document.getElementById(
  "btnAddTransaction"
);
let transactionsContainer = document.getElementById(
  "ScrollTransactionItems"
);
let Income = document.getElementById("income");
let Expense = document.getElementById("expense");
let Balance = document.getElementById("balance");
async function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  if (!description) {
    alert("Please enter a description.");
    return;
  }
  if (isNaN(amount) || amount === 0) {
    alert("Please enter a valid amount (non-zero).");
    return;
  }
  transactionObj.description = description;
  transactionObj.amount = amount;
  if (await transactionObj.save()) {
    alert("Transaction added successfully!");
    descriptionInput.value = "";
    amountInput.value = "";
  }
}
async function loadTransactions() {
  transactionsContainer.innerHTML = "";
  const transactions = await ClsTransactionBusiness.getAllTransactions();
  let totalIncome = 0;
  let totalExpense = 0;
  let balance = 0;
  transactions.forEach((transaction) => {
    const scrollTransactionItems = document.createElement("div");
    scrollTransactionItems.classList.add("ScrollTransaction");
    const TransactionItem = document.createElement("div");
    TransactionItem.classList.add("TransactionItem");
    TransactionItem.dataset.id = transaction.id.toString();
    if (transaction.amount > 0) {
      TransactionItem.classList.add("Income");
      totalIncome += transaction.amount;
    } else {
      TransactionItem.classList.add("Expense");
      totalExpense += Math.abs(transaction.amount);
    }
    const TransactionDescription = document.createElement("h4");
    TransactionDescription.classList.add("TransactionDescription");
    TransactionDescription.textContent = transaction.description;
    const TransactionAmount = document.createElement("h4");
    TransactionAmount.classList.add("TransactionAmount");
    TransactionAmount.textContent = `$${transaction.amount}`;
    const DeleteButton = document.createElement("button");
    DeleteButton.classList.add("DeleteTransaction");
    DeleteButton.textContent = "X";
    DeleteButton.addEventListener("click", async () => {
      const id = parseInt(TransactionItem.dataset.id);
      if (confirm("Are you sure you want to delete this transaction?")) {
        await ClsTransactionBusiness.deleteTransaction(id);
        await loadTransactions();
      }
    });
    scrollTransactionItems.appendChild(TransactionItem);
    TransactionItem.appendChild(TransactionDescription);
    TransactionItem.appendChild(TransactionAmount);
    TransactionItem.appendChild(DeleteButton);
    transactionsContainer.appendChild(scrollTransactionItems);
  });
  balance = totalIncome - totalExpense;
  console.log("Balance:", balance);
  Balance.textContent = `$${balance}`;
  Income.textContent = `$${totalIncome}`;
  Expense.textContent = `$${Math.abs(totalExpense)}`;
}
addTransactionButton.addEventListener("click", addTransaction);
window.addEventListener("DOMContentLoaded", loadTransactions);
