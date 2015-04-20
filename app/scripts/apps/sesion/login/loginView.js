import App from 'app';
import LoginTemplate from 'apps/sesion/login/templates/login';

App.module('Sesion.Login.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class LoginView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = LoginTemplate;
      super(...rest);
    }

    onshow () {
    }
  }

  Views.LoginView = LoginView;
});