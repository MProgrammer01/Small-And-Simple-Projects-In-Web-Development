class ClsExpenseTrackerDB {
  constructor() {
    this.db = null;
    this.dbName = "ExpenseTrackerDB";
    this.dbVersion = 1;
    this.storeName = "Transactions";
  }
  async initialize() {
    try {
      this.db = await this.openDB();
      console.log("\u2705 Database initialized successfully");
    } catch (error) {
      console.error("\u274C Failed to initialize database:", error);
      throw error;
    }
  }
  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true
          });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  static async getDatabase() {
    const instance = new ClsExpenseTrackerDB();
    await instance.initialize();
    if (!instance.db) throw new Error("DB not initialized");
    return instance.db;
  }
}
export {
  ClsExpenseTrackerDB
};
