import App from 'app';
import './dasboardListView';

App.module('Dashboards.List', function(List, App, Backbone, Marionette) {
  'use strict';

  class DashboardList extends Marionette.Object {
    showList(dashboards) {
      var region = this.getOption('region');
      var listView = new List.Views.DashboardListView({
        collection: dashboards 
      });

      region.show(listView);
    }
  }

  List.DashboardList = DashboardList;
});