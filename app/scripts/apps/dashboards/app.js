import App from 'app';
import './editor/dashboardEditor';
import './list/dashboardList';
import './entities';
import './new/editForm';

App.module('Dashboards', function(Dashboards, App, Backbone, Marionette) {
  'use strict';

  this.startWithParent = false;
  class DashboardsAPI extends Marionette.Object {
    constructor(...rest) {
      this.dashboards = new Dashboards.Entities.DashboardsCollection();
      super(...rest);
    }

    showNewDashboard() {
      var paneCollection = new Dashboards.Entities.PaneCollection();
      var dashboardEditor = new Dashboards.Editor.DashboardEditor({
        region: this.getOption('region'),
        modal: this.getOption('modal')
      });

      dashboardEditor.showEditor(paneCollection);
    }

    editDashboard() {
      var editForm = new Dashboards.New.EditForm({
        region: this.getOption('region')
      });

      editForm.showFormEdit(this.dashboards);
    }

    showDashboardList() {
      var dashboardList = new Dashboards.List.DashboardList({
        region: this.getOption('region')
      });

      dashboardList.showList(this.dashboards);
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