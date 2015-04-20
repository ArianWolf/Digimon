import App from 'app';
import tableItemTemplate from 'apps/dashboards/list/templates/tableItem';
import tableTemplate from 'apps/dashboards/list/templates/table';

App.module('Dashboards.List.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class DashboardItemView extends Marionette.ItemView {
    constructor(...rest) {
      this.tagName = 'tr';
      this.template = tableItemTemplate;
      super(...rest);
    }
    initialize() {
      
      this.triggers = { 
        'click .removeItem': 'remove:item',
        'click .editItem': 'edit:dashboard:item'
      };
    }
  }

  class DashboardListView extends Marionette.CompositeView {
    constructor(...rest) {
      this.childView = DashboardItemView;
      this.childViewContainer = 'tbody';
      this.template = tableTemplate;

      super(...rest);
    }
  }

  Views.DashboardListView = DashboardListView;
});