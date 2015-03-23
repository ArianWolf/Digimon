import App from 'app';
import ConfiguratorTemplate from 'apps/dashboards/editor/templates/paneConfigurator';

App.module('Dashboards.Editor.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class ConfiguratorView extends Marionette.ItemView {
    constructor(...rest) {
      super(...rest);
    }

    initialize() {
      this.template = ConfiguratorTemplate;
      
      //this.triggers = { 'click .remove': 'remove:pane' };
    }

    onShow() {
      
    }
  }

  Views.ConfiguratorView = ConfiguratorView;
});