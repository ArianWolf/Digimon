import App from 'app';
import ConfiguratorTemplate from 'apps/dashboards/editor/templates/paneConfigurator';

App.module('Dashboards.Editor.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class ConfiguratorView extends Marionette.ItemView {
    constructor(...rest) {
      this.bindings = {
        '#titulo': 'titulo'
      };
      super(...rest);

    }

    initialize() {
      this.template = ConfiguratorTemplate;
      this.triggers = { 
        'click .complete': 'complete:configurator',
        'click .sources': 'sources:configurator' 
      };

      this.stickit();
    }

    onShow() {
      $('.close').on('click', _.bind(this._hideView, this)); // jshint ignore:line
      $(this.$el).on('keyup', _.bind(this._hideViewWithKeyCode, this)); // jshint ignore:line
    } 

    _hideView() {
      this.$el.css('display', 'none');
    }

    _hideViewWithKeyCode(event) {
      if(event.keyCode === 27) {
        this._hideView();
      }
    }
  }

  Views.ConfiguratorView = ConfiguratorView;
});