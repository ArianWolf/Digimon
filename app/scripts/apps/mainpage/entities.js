import App from 'app';

App.module('Mainpage.Entities', function(Entities, App, Backbone) {
  'use strict';

  class HomeModel extends Backbone.Model { }

  class HomeCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = HomeModel;
      super(...rest);
    }
  }

  Entities.HomeModel = HomeModel;
  Entities.HomeCollection = HomeCollection;
});