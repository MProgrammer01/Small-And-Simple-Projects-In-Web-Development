import { ClsTransactionData } from "../../DataLayer/Transactions/ClsTransactionData.js";
import { ClsTransactionsDto } from "../../DataLayer/Transactions/ClsTransactionDto.js";
class ClsTransactionBusiness {
  constructor() {
    this._id = 0;
    this._description = "";
    this._amount = 0;
  }
  get id() {
    return this._id;
  }
  get description() {
    return this._description;
  }
  set description(newValue) {
    if (!newValue || newValue.trim() === "") {
      throw new Error("Description cannot be empty");
    }
    this._description = newValue.trim();
  }
  get amount() {
    return this._amount;
  }
  set amount(newValue) {
    if (newValue === 0) {
      throw new Error("Amount cannot be zero");
    }
    this._amount = newValue;
  }
  async _AddNewTransaction() {
    const dataLayer = await ClsTransactionData.getInstance();
    const dto = new ClsTransactionsDto(this._description, this._amount);
    this._id = await dataLayer.addTransaction(dto);
    return this._id > 0;
  }
  async save() {
    if (await this._AddNewTransaction()) {
      console.log(`\u2705 Transaction saved with id ${this._id}.`);
      return true;
    }
    return false;
  }
  static async getAllTransactions() {
    const dataLayer = await ClsTransactionData.getInstance();
    return await dataLayer.getAllTransactions();
  }
  static async deleteTransaction(id) {
    const dataLayer = await ClsTransactionData.getInstance();
    return await dataLayer.deleteTransaction(id);
  }
}
export {
  ClsTransactionBusiness
};
