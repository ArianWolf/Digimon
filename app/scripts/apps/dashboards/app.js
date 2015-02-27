import App from 'app';
import './editor/dashboardEditor';
import './entities';

App.module('Dashboards', function(Dashboards, App, Backbone, Marionette) {
  'use strict';

  this.startWithParent = false;

  class DashboardsAPI extends Marionette.Object {
    showNewDashboard() {
      var dashboard = new Backbone.Model();
      var dashboardEditor = new Dashboards.Editor.DashboardEditor({
        region: this.getOption('region')
      });

      dashboardEditor.showEditor(dashboard);
    }

    showWidgetLine() {
      var lineGraph = new LineGraph({ region: this.getOption('region') });
      lineGraph.show();
    }

    editDashboard() {
      // TODO: until backend support, a moked item has been added for testing
      var dashboardMoked = {
        name: 'Dashboard para editar',
        description: 'Este es un dashboard de pruebas para el editor de dashboards'
      };
      var dashboard = new Dashboards.Entities.Dashboard(dashboardMoked);
      var dashboardEditor = new Dashboards.Editor.DashboardEditor({
        region: this.getOption('region')
      });

      dashboardEditor.showFormEdit(dashboard);
    }
  }

  Dashboards.on('start', function(options) {
    Dashboards.controller = new DashboardsAPI(options);
  });

  Dashboards.on('stop', function() {
    if (Dashboards.controller) {
      Dashboards.controller.destroy();
      delete Dashboards.controller;
    }
  });
});