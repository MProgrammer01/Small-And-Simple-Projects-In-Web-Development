import { ClsExpenseTrackerDB } from "../ClsExpenseTrackerDB.js";
class ClsTransactionData {
  constructor() {
    this.db = null;
  }
  static async getInstance() {
    const instance = new ClsTransactionData();
    instance.db = await ClsExpenseTrackerDB.getDatabase();
    return instance;
  }
  ensureDB() {
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }
  async getAllTransactions() {
    const db = this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("Transactions", "readonly");
      const store = tx.objectStore("Transactions");
      const request = store.getAll();
      request.onsuccess = () => {
        console.log(`\u2705 Retrieved ${request.result.length} transactions records`);
        resolve(request.result);
      };
      request.onerror = () => {
        console.error("\u274C Error getting transactions:", request.error);
        reject(request.error);
      };
    });
  }
  async addTransaction(transaction) {
    const db = this.ensureDB();
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction("Transactions", "readwrite");
      const store = transactionObj.objectStore("Transactions");
      const request = store.add(transaction);
      request.onsuccess = (event) => {
        const id = event.target.result;
        console.log(`\u2705 Transaction added with id ${id}.`);
        resolve(id);
      };
      request.onerror = (event) => {
        const error = event.target.error;
        console.error("\u274C Error adding transaction:", error);
        reject(error);
      };
    });
  }
  async deleteTransaction(id) {
    const db = this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("Transactions", "readwrite");
      const store = tx.objectStore("Transactions");
      const request = store.delete(id);
      request.onsuccess = () => {
        console.log(`\u2705 Transaction with id = ${id} deleted`);
        resolve();
      };
      request.onerror = () => {
        console.error("\u274C Error deleting transaction:", request.error);
        reject(request.error);
      };
    });
  }
}
export {
  ClsTransactionData
};
