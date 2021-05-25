export {};
Date.prototype.getDateOnly = function (this): string {
  return ` ${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};
