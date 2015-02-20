import App from 'app';

App.module('Sources.Entities', function(Entities, App, Backbone) {
  'use strict';

  class Source extends Backbone.Model { }

  class SourcesCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = Source;
      super(...rest);
    }
  }

  Entities.Source = Source;
  Entities.SourcesCollection = SourcesCollection;
});
