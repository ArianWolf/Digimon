import 'jquery-validation/dist/jquery.validate';
import App from 'app';
import RegisterTemplate from 'apps/sesion/register/templates/register';

App.module('Sesion.Register.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class RegisterView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = RegisterTemplate;
      this.triggers = { 'click #register-button': 'register:sesion' };
      super(...rest);
    }

    onShow() {
      this.validationForm();
    }

    validationForm() {
      $('#form-personal').validate({
        rules: {
          firstName: 'required',
          lastName: 'required',
          username: 'required',
          password: 'required',
          confirm: 'required',
          email: 'required'
        },
        messages: {
          firstName: 'Introduzca nombre',
          lastName: 'introduzca Apellido',
          username: 'Introduzca nombre de usuario',
          password: 'Introduzca contraseña',
          confirm: 'Confirme contraseña',
          email: 'introduzca E-mail'
        }
      });
    }
  }
  Views.RegisterView = RegisterView;
});