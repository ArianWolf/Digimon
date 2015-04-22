import App from 'app';
import './login/login';
import './register/register';


App.module('Sesion', function(Sesion, App, Backbone, Marionette) {
  'use strict';

  this.startWithParent = false;

  class SesionAPI extends Marionette.Object {
    login() {
      var login = new Sesion.Login.SesionLogin({
        region: this.getOption('region')
      });

      login.showLogin();
    }

    register() {
      var register = new Sesion.Register.SesionRegister({
        region: this.getOption('region')
      });

      register.showRegister();
    }
  }

  Sesion.on('start', function(options) {
    Sesion.controller = new SesionAPI(options);
  });

  Sesion.on('stop', function() {
    if (Sesion.controller) {
      Sesion.controller.destroy();
      delete Sesion.controller;
    }
  });
});