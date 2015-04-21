import 'jquery-validation/dist/jquery.validate';
import App from 'app';
import RegisterTemplate from 'apps/sesion/register/templates/register';

App.module('Sesion.Register.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class RegisterView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = RegisterTemplate;
      super(...rest);
    }

    onShow() {
    }



  }
  Views.RegisterView = RegisterView;
});