import App from 'app';

App.module('Mainpage', function(Mainpage, App, Backbone, Marionette){
  'use strict';

  this.startWithParent = false;

  class MainpageController extends Marionette.Controller {
    
    showmainpage() {
      
      this._loadModuleAndRun('showHome');
    }

    _loadModuleAndRun(action, ...rest) {
      require(['apps/mainpage/app'], function() {
        App.startSubApp('Mainpage', {
         region: new Marionette.Region({ el: '#main-container' })
        });
        App.Mainpage.controller[action](...rest);
      });
    }
  }

  App.on('before:start', function(){
    new Marionette.AppRouter({
      controller: new MainpageController(),
      appRoutes: {
        'app/': 'showmainpage'
        
      }
    });
  });
});