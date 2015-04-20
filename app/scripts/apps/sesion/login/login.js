import App from 'app';
import './loginView';

App.module('Sesion.Login', function(Login, App, Backbone, Marionette) {
  'use strict';

  class SesionLogin extends Marionette.Object {
    constructor(...rest) {
      super(...rest);
    }

    showLogin(dashboards) {
      var region = this.getOption('region');
      var loginView = new Login.Views.LoginView();

      region.show(loginView);
    }
  }

  Login.SesionLogin = SesionLogin;
});