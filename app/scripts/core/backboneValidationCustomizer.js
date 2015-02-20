import _ from 'lodash';
import Backbone from 'backbone';
import 'backbone.validation';

var $el = null;

var translatedMessages = {
  required: 'Este campo es obligatorio',
  minLength: 'Este campo debe tener cuando menos {1} caracteres',
  email: 'Debe ser una dirección de correo electrónico válida',
  equalTo: 'Los campos no coinciden entre sí',
  maxLength: 'Este campo no debe exceder los {1} caracteres',
  number: 'El valor debe ser numérico' 
};

function selectElementByName(view, name) {
  'use strict';
  $el = view.$('[name=' + name + ']');
  if($el.parent().hasClass('input-group')) { $el = $el.parent(); }
}

function removeInputGroupErrorClasses() {
  'use strict';
  var $group = $el.closest('.form-group');
  $group.removeClass('has-error'); 
}

function hideErrorMessages() {
  'use strict';
  var $helpBlock = $el.closest('form-group').find('help-block');
  $helpBlock.slideUp({
    done: function() { $helpBlock.remove(); }
  });
}

function showError(message) {
  'use strict';
  var $error = $('<div>').addClass('help-block')
    .width('100%').html(message).hide();

  var $group = $el.closest('form-group');
  
  if($group.length > 0) { $group.append($error); }
  else { $el.after($error); }

  $error.slideDown();
}

function errorIsShown() {
  'use strict';
  var $errorBlocks = $el.closest('.form-group').find('.help-block');
  return $errorBlocks.length > 0;
}

function updateErrorMessage(message) {
  'use strict';
  var $error = $el.closest('.form-group').find('.help-block');
  $error.html(message);
}

function successCallback(view, attr, selector) { // jshint ignore:line
  'use strict';
  selectElementByName(view, attr);
  removeInputGroupErrorClasses();
  hideErrorMessages();
}

function errorCallback(view, attr, message, selector) { // jshint ignore:line
  'use strict';
  selectElementByName(view, attr);

  var $group = $el.closest('.form-group');
  $group.addClass('has-error');

  if(errorIsShown()) { updateErrorMessage(message); }
  else { showError(message); }
}

_.extend(Backbone.Validation.callbacks, {
  valid: successCallback, invalid: errorCallback
});

_.extend(Backbone.Validation.messages, translatedMessages);