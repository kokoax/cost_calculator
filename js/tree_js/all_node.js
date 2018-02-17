class AllNode {
  constructor() {
    this.trees = [];
    this.nodes = [];
  }

  get_node(name) {
    for(var i in this.nodes) {
      if(this.nodes[i].name == name) {
        return this.nodes[i];
      }
    }
    return new EmptyTerminal(name);
  }

  has_node(name) {
    for(var i in this.nodes) {
      if(this.nodes[i].name == name) {
        return true;
      }
    }
    return false;
  }

  update_price_with_child(name) {
    for(var i in this.nodes) {
      for(var child_i in this.nodes[i].children) {
        if(this.nodes[i].children[child_i].name == name) {
          this.nodes[i].update_price();
        }
      }
    }
  }

  update_all_child(node) {
    for(var i in this.nodes) {
      for(var child_i in this.nodes[i].children) {
        if(this.nodes[i].children[child_i].name == node.name) {
          this.nodes[i].children[child_i] = node;
        }
      }
    }
  }

  update_node(unode) {
    for(var i in this.nodes) {
      if(this.nodes[i].name == unode.name) {
        this.nodes[i] = unode;
        this.update_all_child(unode);
      }
    }
    this.update_price_with_child(unode.name);
  }

  add_node(node) {
    var index = this.nodes.push(node);
    this.update_node(node);
    return index;
  }

  add_tree(name, child_names, child_number, product_number) {
    var children = []

    var new_tree = new Tree(new TreeNode(name, children, child_number, product_number));
    var index = this.add_node(new_tree.top_node);

    // ツリーの頂点に来るノードの子をなければ生成、あれば、値段をとりあえず計算
    // TODO: 計算量がやばい
    for(var i in child_names) {
      var child = this.get_node(child_names[i]);
      children.push(child);
      if(child.mode == PrimitiveNode.EMPTY) {
        // this.add_node(child);
      } else {
        this.update_price_with_child(child_names[i]);
      }
    }
    return index;
  }
}
