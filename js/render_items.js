var g_docs = undefined;
class ItemCtl {
  constructor() {
    this.all_node = new AllNode();
    this.db =  new Datastore({
      filename: './state.db',
      autoload: true
    });
    this.set_to_all_node();
  }

  set_to_all_node() {
    this.db.find({}, {multi: true}, function(err, docs){
      for(var i in docs) {
        var node = docs[i].data;
        // childrenを持っていればNode
        // childrenを持っていなければTerminal
        if("children" in node) {
          var children = [];
          for(var i in node.children) {
            children.push(node.children[i].name);
          }
          items.add_product(node.name, children, node.child_number, node.product_number);
        } else {
          items.add_buying(node.name, node.price);
        }
      }
    });
  }

  dump_to_db() {
    var self = this;
    this.db.remove({}, {multi: true}, function(_,__) {
      self.db.loadDatabase();
    });
    for(var i in this.all_node.nodes) {
      this.db.insert([{"name": this.all_node.nodes[i].name, "data": this.all_node.nodes[i]}]);
      this.all_node.nodes[i]
    }
  }

  update_price_view(index) {
    var name = this.all_node.nodes[index].name;
    var price = this.all_node.nodes[index].price / this.all_node.nodes[index].product_number;
    // var unit_price = this.all_node.nodes[index].unit_price;
    $(['#', name].join('')).text([name,': ', price, 'G'].join(''));
  }

  update_material(index) {
    var name = this.all_node.nodes[index].name;
    var price = this.all_node.nodes[index].price;
    $(['.', name].join('')).toggleClass('uk-form-danger');
  }

  update_view(index) {
    this.update_price_view(index);
  }

  update(updated_index) {
    this.update_material(updated_index);
    for(var i in this.all_node.nodes) {
      if(this.all_node.nodes[i].mode == PrimitiveNode.NODE) {
        this.update_view(i);
      }
    }
  }

  view_items() {
    for(var index in this.all_node.nodes) {
      if(this.all_node.nodes[index].mode == PrimitiveNode.NODE) {
        this.insert_product(index);
      } else if(this.all_node.nodes[index].mode == PrimitiveNode.TERMINAL) {
        this.insert_buying(index);
      }
    }
  }

  card_body() {
    return $('<div>')
      .addClass('uk-card')
      .addClass('uk-card-default')
      .addClass('uk-card-body')
      .addClass('uk-width-2-3');
  }
  card_title(id, title) {
    return $('<h3>').attr('id', id).addClass('uk-card-title').text(title);
  }
  card_material(name, body) {
    return $('<span>').addClass("product-material").addClass(name).text(body);
  }
  card_material_danger(name, body) {
    return $('<span>').addClass('uk-form-danger').addClass("product-material").addClass(name).text(body);
  }

  card_materials(mnames, mnums) {
    var m = $('<div>').addClass('uk-width-1-1 uk-grid');
    var names  = $('<div>').addClass('uk-width-1-2');
    var counts = $('<div>').addClass('uk-width-1-2');
    for(var i in mnames) {
      if(mnames[i].mode == PrimitiveNode.EMPTY) {
        names .append(this.card_material_danger(mnames[i].name, mnames[i].name));
        counts.append(this.card_material_danger(mnames[i].name, mnums[i]));
      } else {
        names .append(this.card_material(mnames[i].name, mnames[i].name));
        counts.append(this.card_material(mnames[i].name, mnums[i]));
      }
    }
    m.append(names);
    m.append(counts);
    return m;
  }

  insert_product(index) {
    var name = this.all_node.nodes[index].name;
    var mnames = this.all_node.nodes[index].children; // this.product[name].material;
    var mnums  = this.all_node.nodes[index].child_number; // this.product[name].material;
    var price = this.all_node.nodes[index].price / this.all_node.nodes[index].product_number;
    var body  = this.card_body();
    var title = this.card_title(name, [name, ": ", price, "G"].join(""));

    var ms = this.card_materials(mnames, mnums);

    body.append(title);
    body.append(ms);
    $('#product div.card-group').append(body);
  }

  add_product(name, children, numbers, product_number) {
    var ret = true;
    if(this.all_node.has_node(name)) {
      // TODO: 既に同名の仕入品がある場合の処理
      ret = false;
    } else {
      console.log("product");
      var index = this.all_node.add_tree(name, children, numbers, product_number);
      this.update(index-1);
      this.insert_product(index-1);
    }
    return ret;
  }

  add_buying(name, price) {
    var ret = true;
    if(this.all_node.has_node(name)) {
      // TODO: 既に同名の仕入品がある場合の処理
      ret = false;
    } else {
      console.log("buying");
      var index = this.all_node.add_node(new Terminal(name, price));
      this.update(index-1);
      this.insert_buying(index-1);
    }
    return ret;
  }

  insert_buying(index) {
    var name  = this.all_node.nodes[index].name;
    var price = this.all_node.nodes[index].price;
    var body  = this.card_body().addClass("uk-card-small");
    var title = this.card_material("", [name, ": ", price, "G"].join(""));
    body.append(title);
    $('#buying div.card-group').append(body);
  }
}

var items = new ItemCtl()
var all_node = new AllNode();
window.onload = function() {
  items.view_items()
}
