import App from 'app';
import './dashboardConfiguratorView';

App.module('Dashboards.Configurator', function(Configurator, App, Backbone, Marionette) {
  'use strict';

  class DashboardConfigurator extends Marionette.Object {
    constructor(...rest) {
      //this.panes = new Backbone.Collection();
      super(...rest);
    }

    showConfigurator(dashboard) {
      var region = this.getOption('region');
      var configuratorView = new Configurator.Views.ConfiguratorView();

      region.show(configuratorView);
    }
  }

  Configurator.DashboardConfigurator = DashboardConfigurator;
});