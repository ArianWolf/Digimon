import App from 'app';
import './sourceListView';

App.module('Sources.List', function(List, App, Backbone, Marionette) {
  'use strict';

  class SourceList extends Marionette.Object {
    showSources() {
      var region = this.getOption('region');
      var listView = new List.Views.SourceListView({ collection: this.getOption('collection') });
      region.show(listView);
    }
  }

  List.SourceList = SourceList;
});
