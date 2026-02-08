class ClsTransactionsDto {
  constructor(description, amount) {
    this._id = 0;
    this.description = "";
    this.amount = 0;
    this.description = description;
    this.amount = amount;
  }
  get id() {
    return this._id;
  }
}
export {
  ClsTransactionsDto
};
