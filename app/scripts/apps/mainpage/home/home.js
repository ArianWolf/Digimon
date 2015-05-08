import App from 'app';
import './homeView';

App.module('Mainpage.Home', function(Home, App, Backbone, Marionette) {
  'use strict';

  class MainPageHome extends Marionette.Object {
    showHome() {
      var region = this.getOption('region');
      var homeView = new Home.Views.HomeLayoutView();
      region.show(homeView);

      var regionCollection = homeView.getOption('itemContainer');
      var homeColletionView = new Home.Views.HomeCollectionView({
      	collection: this.getOption('collection')});
      
      regionCollection.show(homeColletionView);
    }
  }

  Home.MainPageHome = MainPageHome;
});