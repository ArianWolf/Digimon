import App from 'app';
import './list/sourceList';
import './entities';
import './dropzone/sourceDropzone';

App.module('Sources', function(Sources, App, Backbone,Marionette) {
  'use strict';

  class SourcesAPI extends Marionette.Object {
    showAvailableSources() {
      var sourceList = new Sources.List.SourceList({
        region: this.getOption('region'),
        collection: this._getAvailableSources()
      });

      sourceList.showSources();
    }

    showDropzone() {
      var sourceDropzone = new Sources.Dropzone.SourceDropzone({
        region: this.getOption('region')
      });

      sourceDropzone.showDropzone();
    }

    _getAvailableSources() {
      return new Sources.Entities.SourcesCollection([
        { id: '1', nombre: 'Source number 1', tipo: 'Microsoft Word', color: 'success' },
        { id: '2', nombre: 'Source number 2', tipo: 'Microsoft Excel', color: 'primary' },
        { id: '3', nombre: 'Source number 3', tipo: 'Data Base', color: 'complete' },
        { id: '4', nombre: 'Source number 4', tipo: 'Another source', color: 'complete' },
        { id: '5', nombre: 'Source number 5', tipo: 'One more source', color: 'success' }
      ]);
    }
  }

  Sources.on('start', function(options) {
    Sources.controller = new SourcesAPI(options);
  });

  Sources.on('stop', function() {
    if(Sources.controller) {
      Sources.controller.destroy();
      delete Sources.controller;
    }
  });

  Sources.SourcesAPI = SourcesAPI;
});
