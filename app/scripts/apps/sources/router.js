import App from 'app';

App.module('Sources', function(Sources, App, Backbone, Marionette) {
  'use strict';

  this.startWithParent = false;

  class SourcesController extends Marionette.Controller {
    showAvailableSources() {
      this._loadModuleAndRun('showAvailableSources');
    }

    _loadModuleAndRun(action, ...rest) {
      require(['apps/sources/app'], function() {
        App.startSubApp('Sources', {
          region: new Marionette.Region({ el: '#main-container' })
        });

        App.Sources.controller[action](...rest);
      });
    }
  }

  App.on('before:start', function() {
    new Marionette.AppRouter({
      controller: new SourcesController(),
      appRoutes: {
        'app/fuentes/': 'showAvailableSources'
      }
    });
  });

  Sources.SourcesController = SourcesController;
});
