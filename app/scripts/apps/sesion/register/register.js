import 'sweetalert/lib/sweet-alert.css';
import Sweetalert from 'sweetalert';
import 'jquery-validation/dist/jquery.validate';
import App from 'app';
import './registerView';

App.module('Sesion.Register', function(Register, App, Backbone, Marionette) {
  'use strict';

  class SesionRegister extends Marionette.Object {
    constructor(...rest) {

      super(...rest);
    }

    showRegister() {
      var region = this.getOption('region');
      var registerView = new Register.Views.RegisterView();

      this.listenTo(registerView, 'register:sesion', (child) => {

        if(child.view.$('#form-personal').valid()){
          Sweetalert("Cuenta creada!", "Ahora inicia sesion !", "success")
          App.router.navigate('/app/login/', { trigger: true });
        }
        
      });

      region.show(registerView);
    }
  }

  Register.SesionRegister = SesionRegister;
});