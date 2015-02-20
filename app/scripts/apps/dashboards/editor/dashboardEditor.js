import App from 'app';
import './dashboardEditorView';
import './editFormView';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.panes = new Backbone.Collection();
      super(...rest);
    }

    showEditor(dashboard) {
      var region = this.getOption('region');
      var editorView = new Editor.Views.DashboardEditorView({
        model: dashboard,
        collection: this.panes
      });

      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model();
        this.panes.add(pane);
      });

      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      this.listenTo(editorView, 'save:dashboard', () => {});

      this.listenTo(editorView, 'edit:pane', () => {});

      region.show(editorView);
    }

    showFormEdit(dashboard) {
      var region = this.getOption('region');
      var editFormView = new Editor.Views.EditFormView({ model: dashboard });

      region.show(editFormView);
    }
  }

  Editor.DashboardEditor = DashboardEditor;
});