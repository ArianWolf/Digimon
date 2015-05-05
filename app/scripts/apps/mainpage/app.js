import App from 'app';
import './home/home';

App.module('Mainpage', function(Mainpage, App, Backbone,Marionette) {
  'use strict';

  class MainpageAPI extends Marionette.Object {
    
    showHome() {
      
      var home = new Mainpage.Home.MainPageHome({
          region: this.getOption('region')
      });
      home.showHome();
    }

  }

  Mainpage.on('start', function(options) {
    Mainpage.controller = new MainpageAPI(options);
  });

  Mainpage.on('stop', function() {
    if(Mainpage.controller) {
      Mainpage.controller.destroy();
      delete Mainpage.controller;
    }
  });

  Mainpage.MainpageAPI = MainpageAPI;
});
