import 'jquery-validation/dist/jquery.validate';
import App from 'app';
import LoginTemplate from 'apps/sesion/login/templates/login';

App.module('Sesion.Login.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class LoginView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = LoginTemplate;
      super(...rest);
    }

    onShow() {
      this.validationForm();
      this.verifyField('username');
      this.verifyField('password');

      this.disableSingInButton();
    }

    validationForm() {
      $('#login').validate({
        rules: {
          password: 'required',
          username: 'required'
        },
        messages: {
          password: 'introduzca contraseña',
          username: 'Introduzca nombre de usuario'
        }
      });
    }

    verifyField(field) {
      var _this = this;
      $('#'+field).on('keyup', function() {
        if($('#login').valid()) {
           $('#singin').removeAttr('disabled');
        } else {
          _this.disableSingInButton();
        }
      });
    }

    disableSingInButton() {
      $('#singin').attr('disabled', 'disabled');
    }

  }
  Views.LoginView = LoginView;
});