items = new AllNode();

children = ["水", "革", "糸", "はさみ"];
items.add_tree("レザーサンダル", children);

var scissor = new Terminal("はさみ", 150);

items.update_node(scissor);

items.update_node(new Terminal("水", 20));
var leather_children = ["獣の革","水","なめし道具"];
items.add_tree("革", leather_children);

var yarn_children = ["カイコの糸","裁縫道具"]
items.add_tree("糸", yarn_children);
items.update_node(new Terminal("カイコの糸", 50));
items.update_node(new Terminal("裁縫道具", 200));

items.update_node(scissor);

