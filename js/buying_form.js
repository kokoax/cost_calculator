function close_modal_buying(name) {
  $('.uk-modal-close')[1].click();
}

function buying_form_clear() {
  $('#buying-form').empty();
}

/*
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
*/

function buying_form_name() {
  return $('<input>')
    .addClass('uk-input')
    .addClass('uk-margin')
    .addClass('uk-width-3-4')
    .attr('id', 'buying-name')
    .attr('type', 'text')
    .attr('placeholder', '仕入品名');
}

function buying_form_price() {
  return $('<input>')
    .addClass('uk-input')
    .addClass('uk-width-1-4')
    .attr('id', 'buying-price')
    .attr('type', 'number')
    .attr('min', 0)
    .attr('data-format', '$1 G')
    .attr('value', 0);
}

function buying_form_submit_wrapper() {
  return $('<div>')
    .addClass('uk-width-1-1')
    .attr('id', 'buying-submit-wrapper');
}
function buying_form_submit() {
  return buying_form_submit_wrapper().append(
    $('<input>')
    .addClass('uk-input')
    .addClass('uk-margin')
    .addClass('uk-width-1-4')
    .attr('id', 'buying-submit')
    .attr('type', 'button')
    .attr('value', '追加')
  );
}

function buying_form_reset() {
  buying_form_clear();
  var body = $('#buying-form');
  body.append(form_close_button());
  body.append(buying_form_name());
  body.append(buying_form_price());
  body.append(buying_form_submit());
}

function check_buying_form() {
  var ret = true;
  if($('#buying-name').val() == "") {
    form_danger($('#buying-name'));
    ret = false
  } else {
    form_safe($('#buying-name'));
  }
  if($('#buying-price').val() == "") {
    form_danger($('#buying-price'));
    ret = false
  } else {
    form_safe($('#buying-price'));
  }
  return ret;
}

$(function() {
  $(document).on('click', '#buying-submit', function(){
    if(check_buying_form()) {
      var buying = {}
      var name = $('#buying-name').val()
      var price = $('#buying-price').val()

      if(items.add_buying(name, price) == false) {
        form_danger($('#buying-name'));
      } else {
        console.log("close modal on buying");
        close_modal_buying();
      }
    }
    return false;
  });
});

$(function() {
  $('#visible-buying-form').click(function () {
    buying_form_reset();
    return false;
  });
});
