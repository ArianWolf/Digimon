import App from 'app';
import sourceListItemTemplate from 'apps/sources/list/templates/sourceListItem';

App.module('Sources.List.Views', function(Views, App, Backbone, Marionette) {
  'use strict';

  class SourceListItemView extends Marionette.ItemView {
    constructor(...rest) {
      this.className = 'source-list-item col-xs-12 col-sm-4';
      this.template = sourceListItemTemplate;
      super(...rest);
    }
  }

  class SourceListView extends Marionette.CollectionView {
    constructor(...rest) {
      this.className = 'source-list-container col-md-12';
      this.childView = SourceListItemView;
      this.childViewContainer = '.source-list-container';
      super(...rest);
    }
  }

  Views.SourceListView = SourceListView;
});
