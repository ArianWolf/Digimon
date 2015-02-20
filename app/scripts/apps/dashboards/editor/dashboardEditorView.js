import App from 'app';
import EditorTemplate from 'apps/dashboards/editor/templates/editor';
import PaneTemplate from 'apps/dashboards/editor/templates/pane';
import 'gridster.js/dist/jquery.gridster';

App.module('Dashboards.Editor.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class PaneView extends Marionette.ItemView {
    constructor(...rest) {
      this.tagName = 'li';
      this.className = 'panel panel-default bg-success';
      super(...rest);
    }

    initialize() {
      this.triggers = { 'click .remove': 'remove:pane' };
      this.template = PaneTemplate;
    }
  }

  class DashboardEditorView extends Marionette.CompositeView {
    constructor(...rest) {
      this.className = 'gridster';
      this.childView = PaneView;
      this.childViewContainer = 'ul';
      super(...rest);
    }

    initialize() {
      this.template = EditorTemplate;
      this.triggers = {
        'click .add': 'add:pane',
        'click .save': 'save:dashboard'
      };
    }

    attachHtml(collectionView, childView) {
      this.gridster.add_widget(childView.el, 1, 1); // jshint ignore:line
    }

    onBeforeRemoveChild(child) {
      this.gridster.remove_widget(child.$el); // jshint ignore:line
    }

    onShow() {
      this.gridster = $('.gridster ul').gridster({
        widget_base_dimensions: [300, 100], // jshint ignore:line
        resize: {
          enabled: true
        }
      }).data('gridster');
    }
  }

  Views.DashboardEditorView = DashboardEditorView;
});
