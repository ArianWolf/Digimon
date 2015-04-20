import App from 'app';

App.module('Sesion', function(Sesion, App, Backbone, Marionette){
  'use strict';

  this.startWithParent = false;

  class SesionController extends Marionette.Controller {
    login() {
      this._loadModuleAndRun('login');
    }

    _loadModuleAndRun(action, ...rest) {
      require(['apps/sesion/app'], function() {
        App.startSubApp('Sesion', {
          region: App.appLayout.getRegion('full'),
        });
        App.Sesion.controller[action](...rest);
      });
    }
  }

  App.on('before:start', function(){
    new Marionette.AppRouter({
      controller: new SesionController(),
      appRoutes: {
        'app/login/': 'login'
      }
    });
  });
});