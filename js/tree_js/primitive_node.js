class PrimitiveNode {
  constructor(name, price, product_number, mode) {
    this.name = name;
    this.price = price;
    this.mode = mode;
    this.product_number = product_number;
  }

  static get NODE() {
    return 0;
  }
  static get TERMINAL() {
    return 1;
  }
  static get EMPTY() {
    return 2;
  }
}
