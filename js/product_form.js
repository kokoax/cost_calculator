function close_modal_product(name) {
  $('.uk-modal-close')[0].click();
}

function product_form_clear() {
  $('#product-form').empty();
}

function product_form_reset() {
  product_form_clear();
  var body = $('#product-form');
  body.append(form_close_button());
  body.append(product_form_product_name());
  body.append(product_form_product_number());
  body.append(product_form_material_wrapper());
  body.append(product_form_insert_button());
  body.append(product_form_delete_button());
  body.append(product_form_submit());
  insert_material2form();
}

function form_close_button_wrapper() {
  return $('<div>')
    .addClass('uk-width-1-1')
    .addClass('close-button-wrapper');
}

function form_close_button() {
  var wrapper = form_close_button_wrapper();
  return wrapper.append($('<a>')
    .addClass('uk-modal-close')
    .attr('href', 'javascript:void 0;')
    .attr('uk-icon','close'));
}

function product_form_product_name() {
  return $('<input>')
    .addClass('uk-input')
    .addClass('uk-margin')
    .addClass('uk-width-3-4')
    .attr('id', 'product-name')
    .attr('type', 'text')
    .attr('placeholder', '製品名');
}

function product_form_product_number() {
  return $('<input>')
    .addClass('uk-input')
    .addClass('uk-margin')
    .addClass('uk-width-1-4')
    .attr('id', 'product-number')
    .attr('type', 'number')
    .attr('min', '1')
    .attr('placeholder', '制作個数')
}

function product_form_material_wrapper() {
  return $('<div>')
    .attr('id', 'product-materials');
}

function product_form_insert_button() {
  return $('<a>')
    .attr('href', 'javascript:void 0;')
    .attr('id', 'insert-product-material')
    .attr('uk-icon','plus-circle');
}

function product_form_delete_button() {
  return $('<a>')
    .attr('href', 'javascript:void 0;')
    .attr('id', 'delete-product-material')
    .attr('uk-icon','minus-circle');
}

function product_form_submit_wrapper() {
  return $('<div>')
    .addClass('uk-width-1-1')
    .attr('id', 'product-submit-wrapper');
}
function product_form_submit() {
  return product_form_submit_wrapper().append(
    $('<input>')
    .addClass('uk-input')
    .addClass('uk-margin')
    .addClass('uk-width-1-4')
    .attr('id', 'product-submit')
    .attr('type', 'button')
    .attr('value', '追加')
  );
}

function product_form_material_body() {
  return $('<div>')
    .addClass('product-material')
    .addClass('uk-grid');
}

function product_form_material_name(name) {
  return $('<input>')
    .addClass('product-material-name')
    .addClass('uk-input')
    .addClass('uk-width-3-4')
    .addClass(name)
    .attr('type', 'text')
    .attr('placeholder', '素材名');
}

function product_form_material_number(name) {
  return $('<input>')
    .addClass('product-material-number')
    .addClass('uk-input')
    .addClass('uk-width-1-4')
    .addClass(name)
    .attr('type', 'number')
    .attr('min', 1)
    .attr('placeholder', '必要個数');
}

function insert_material2form() {
  var body = product_form_material_body();
  body.append(product_form_material_name());
  body.append(product_form_material_number());

  $('#product-materials').append(body);
}

function delete_material() {
  var child = $("#product-materials").find(".product-material")
  if(child.length > 1) {
    child.filter(":last").remove();
  }
}

function form_danger(elem) {
  elem.addClass('uk-form-danger');
}
function form_safe(elem) {
  elem.removeClass('uk-form-danger');
}

function product_check_materials() {
  var ret = true;
  $('#product-materials').children().each(function(_,material) {
    $(material).children().each(function(_,elem) {
      if($(elem).val() == "") {
        form_danger($(elem));
        ret = false;
      } else {
        form_safe($(elem));
      }
    });
  });
  return ret;
}

function product_check_form() {
  var ret = true;
  if($('#product-name').val() == "") {
    // TODO: このidの要素をわかりやすく表示する
    form_danger($('#product-name'));
    ret = false;
  } else {
    form_safe($('#product-name'));
  }
  if(!product_check_materials()) {
    ret = false;
  }
  return ret;
}

$(function() {
  $(document).on('click', '#insert-product-material', function(){
    insert_material2form();
    return false;
  });
});

$(function() {
  $(document).on('click', '#delete-product-material', function(){
    delete_material2form();
    return false;
  });
});

$(function() {
  $(document).on('click', '#product-submit', function(){
    if(product_check_form()) {
      var children = [];
      var numbers = [];
      var name = $('#product-name').val();
      var product_number = $('#product-number').val();
      $('#product-materials').find('.product-material').each(function(_,child) {
        var mname  = $(child).find('.product-material-name').val();
        var number = $(child).find('.product-material-number').val();
        children.push(mname);
        numbers.push(number);
      });

      if(items.add_product(name, children, numbers, product_number) == false) {
        form_danger($('#product-name'));
      } else {
        close_modal_product();
      }
    }

    return false;
  });
});

$(function() {
  $('#visible-product-form').click(function () {
    product_form_reset();
    return false;
  });
});
