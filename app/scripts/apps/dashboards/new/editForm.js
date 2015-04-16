import App from 'app';
import './editFormView';
import DashboardList from 'apps/dashboards/list/dashboardList';

App.module('Dashboards.New', function(New, App, Backbone, Marionette) {
  'use strict';

  class EditForm extends Marionette.Object {
    constructor(...rest) {

      super(...rest);
    }

    showFormEdit(dashboards) {
      var region = this.getOption('region');
      var editFormView = new New.Views.EditFormView({ collection: dashboards });

      this.listenTo(editFormView, 'save:edit', (child) => {
        var data = this._getDashboardData(child);
        var dashboard = new Backbone.Model(data);
        dashboards.add(dashboard);

        App.router.navigate('/app/dashboard/', { trigger: true });
      });

      region.show(editFormView);
    }

    _getDashboardData(child) {
      return {
        name: child.view.$('#name').val(),
        description: child.view.$('#description').val()
      }
    }
  }

  New.EditForm = EditForm;
});