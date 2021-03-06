import App from 'app';

App.module('Dashboards', function(Dashboards, App, Backbone, Marionette){
  'use strict';

  this.startWithParent = false;

  class DashboardController extends Marionette.Controller {
    showDashboardList() {
      this._loadModuleAndRun('showDashboardList');
    }

    showNewDashboard() {
      this._loadModuleAndRun('showNewDashboard');
    }

    _loadModuleAndRun(action, ...rest) {
      require(['apps/dashboards/app'], function() {
        App.startSubApp('Dashboards', {
          region: App.appLayout.getRegion('mainContainer'),
          modal: App.appLayout.getRegion('modal')
        });
        App.Dashboards.controller[action](...rest);
      });
    }
  }

  App.on('before:start', function(){
    new Marionette.AppRouter({
      controller: new DashboardController(),
      appRoutes: {
        'app/dashboard/': 'showDashboardList',
        'app/dashboard/crear/': 'showNewDashboard'
      }
    });
  });
});