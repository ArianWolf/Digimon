import 'gridster.js/dist/jquery.gridster';
import App from 'app';
import EditorTemplate from 'apps/dashboards/editor/templates/editor';
import PaneTemplate from 'apps/dashboards/editor/templates/pane';
import EditorLayoutTemplate from 'apps/dashboards/editor/templates/editorLayout';
import PreviewEmptyTemplate from 'apps/dashboards/editor/templates/previewEmpty';
import SaveDashboardTemplate from 'apps/dashboards/editor/templates/saveDashboard';

App.module('Dashboards.Editor.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class PaneView extends Marionette.LayoutView {
    constructor(...rest) {
      this.tagName = 'li';
      this.className = 'panel panel-default';
      this.regions = { body: '.panel-body' };
      super(...rest);
    }

    initialize() {
      this.template = PaneTemplate;
      
      this.triggers = { 
        'click .remove': 'remove:pane',
        'click .options': 'options:pane'
      };
    }
  }

  class DashboardEditorView extends Marionette.CompositeView {
    constructor(...rest) {
      this.className = 'gridster';
      this.childView = PaneView;
      this.childViewContainer = 'ul';
      this.regions ={ preview: '.preview-zone'};
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
        widget_base_dimensions: [350, 300], // jshint ignore:line
        resize: {
          enabled: true
        }
      }).data('gridster');
    }
  }

  class EditorLayoutView extends Marionette.LayoutView {
    constructor(...rest) {
      this.template = EditorLayoutTemplate; 
      this.regions = { 
        editorContainer: '.editor-container',
        preview: '.preview-zone',
        save: '.save-dashboard'
      };
      this.triggers = {
        'click #back': 'back:view'
      };
      super(...rest);
    }
  }

  class PreviewEmptyView extends Marionette.ItemView {
    constructor(...rest) {
      this.className = 'empty-preview';
      this.template = PreviewEmptyTemplate; 
      super(...rest);
    }
  }

  class SaveDashboard extends Marionette.ItemView {
    constructor(...rest) {
      this.template = SaveDashboardTemplate; 
      this.triggers = {
        'click #save': 'save:data'
      };
      super(...rest);
    }
  }
  Views.SaveDashboard = SaveDashboard;
  Views.PreviewEmptyView = PreviewEmptyView;
  Views.EditorLayoutView = EditorLayoutView;
  Views.DashboardEditorView = DashboardEditorView;
});