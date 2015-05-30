import App from 'app';
import './home/home';
import './entities';

App.module('Mainpage', function(Mainpage, App, Backbone,Marionette) {
  'use strict';

  class MainpageAPI extends Marionette.Object {
    
    showHome() {
      var home = new Mainpage.Home.MainPageHome({
        region: this.getOption('region'),
        collection: this._getAvailableOptions()
      });
      home.showHome();
    }

    _getAvailableOptions() {
      return new Mainpage.Entities.HomeCollection([
        { id: '1', icon: 'fa-bar-chart', text: 'Crea tus propios dashboards', url: 'dashboard/crear/' },
        { id: '2', icon: 'fa-upload', text: 'Sube tus fuentes de información', url: 'fuentes/' },
        { id: '3', icon: 'fa-user', text: 'Edita tu perfil, ayudanos a conocerte', url: 'usuarios/perfil/' },
        { id: '4', icon: 'fa-list', text: 'Echale un ojo a tu lista de dashbaords y realiza acciones', url: 'dashboard/' },
        { id: '5', icon: 'fa-users', text: 'Añade usuarios a los dashboards que tú hayas creado', url: 'dashboard/' },
      ]);
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
