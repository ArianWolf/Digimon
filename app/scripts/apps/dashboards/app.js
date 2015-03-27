import App from 'app';
import './editor/dashboardEditor';
import './list/dashboardList';
import './entities';

App.module('Dashboards', function(Dashboards, App, Backbone, Marionette) {
  'use strict';

  this.startWithParent = false;

  class DashboardsAPI extends Marionette.Object {
    showNewDashboard() {
      var paneCollection = new Dashboards.Entities.PaneCollection();
      var dashboardEditor = new Dashboards.Editor.DashboardEditor({
        region: this.getOption('region'),
        modal: this.getOption('modal')
      });

      dashboardEditor.showEditor(paneCollection);
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

    showDashboardList() {
      // TODO: until backend support, two moked items has been added for testing
      var dashboardsMoked = [{
        name: 'Dashboard ventas',
        description: 'Este es un dashboard de ventas'
      }, {  
        name: 'Dashboard para pruebas',
        description: 'Este es un dashboard de pruebas para la lista '
      }];
      var dashboards = new Dashboards.Entities.DashboardsCollection(dashboardsMoked);
      var dashboardList = new Dashboards.List.DashboardList({
        region: this.getOption('region')
      });

      dashboardList.showList(dashboards);
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