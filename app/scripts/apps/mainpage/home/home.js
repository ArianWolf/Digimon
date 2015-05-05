import App from 'app';
import './homeView';

App.module('Mainpage.Home', function(Home, App, Backbone, Marionette) {
  'use strict';

  class MainPageHome extends Marionette.Object {
    showHome() {
      var region = this.getOption('region');
      var homeView = new Home.Views.HomeView();

      region.show(homeView);
    }
  }

  Home.MainPageHome = MainPageHome;
});