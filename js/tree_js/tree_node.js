class TreeNode extends PrimitiveNode {
  constructor(name, children, child_number, product_number) {
    super(name, -1, product_number, 0);
    this.children = children;
    this.child_number = child_number;
  }
  update_price() {
    this.price = 0
    for(var i in this.children) {
      if(this.children[i].price != -1) {
        this.price += this.children[i].price * this.child_number[i] / this.children[i].product_number;
      }
    }
  }
}

class Terminal extends PrimitiveNode {
  constructor(name, price) {
    super(name, price, 1, 1);
  }
}

class EmptyTerminal extends PrimitiveNode {
  constructor(name) {
    super(name, -1, 1, 2);
  }
}
