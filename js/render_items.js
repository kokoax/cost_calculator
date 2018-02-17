class ItemCtl {
  constructor() {
    // var json = '{"product": {"ビー玉": {"material": {"ガラス": 10, "顔料": 10, "炉": 1}, "product_number": 30}, "革": {"material": {"水": 5, "獣の革": 5, "なめし道具": 1}, "product_number": 5}}, "buying": {"水": 20, "獣の革": 10, "なめし道具": 150}}';
    // this.data = JSON.parse(json);
    this.all_node = new AllNode();
    // this.all_node.add_tree("糸", ["カイコの繭", "紡績機織道具"], [10,1], 25);
    // this.all_node.add_node(new Terminal("カイコの繭", 50));
    // this.all_node.add_node(new Terminal("紡績機織道具", 150));
    // this.all_node.add_tree("革", ["獣の革", "水", "なめし道具"], [5,5,1], 5);
    // this.all_node.add_node(new Terminal("獣の革", 10));
    // this.all_node.add_node(new Terminal("水", 20));
    // this.all_node.add_node(new Terminal("なめし道具", 150));
    // this.all_node.add_tree("レザーサンダル", ["革", "糸", "はさみ", "裁縫セット", "サンフラワーオイル","アダマンチウムインゴット"], [20,10,1,1,1,1], 5);
    // this.all_node.add_node(new Terminal("サンフラワーオイル", 150));
    // this.all_node.add_node(new Terminal("はさみ", 150));
    // this.all_node.add_node(new Terminal("裁縫セット", 150));
    // this.all_node.add_node(new Terminal("アダマンチウムインゴット", 200));
  }

  dump_to_db() {
  }

  update_price_view(index) {
    var name = this.all_node.nodes[index].name;
    var price = this.all_node.nodes[index].price / this.all_node.nodes[index].product_number;
    // var unit_price = this.all_node.nodes[index].unit_price;
    $(['#', name].join('')).text([name,': ', price, 'G'].join(''));
  }

  update_material(index) {
    console.log(index);
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
