import App from 'app';
import './dashboardEditorView';
import './editFormView';
import './dashboardConfiguratorView';
import widgetsContainer from '../../../widgets/widgetsContainer';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.panes = new Backbone.Collection();
      this.widgetsContainer = widgetsContainer;
      super(...rest);
    }

    showEditor(dashboard) {
      var region = this.getOption('region');
      var editorView = new Editor.Views.DashboardEditorView({
        model: dashboard,
        collection: this.panes
      });

      this.listenTo(editorView, 'add:pane', () => {
        var widgetData = { titulo: ''};
        var pane = new Backbone.Model(widgetData);
        this.panes.add(pane);
        var region = this.getOption('modal');
        var configuratorView = new Editor.Views.ConfiguratorView({model: pane});
        region.show(configuratorView);
        this.listenTo(configuratorView, 'complete:configurator', (child) => {
          var typeWidget = child.view.$('.type-widget').val();
          var graph = new this.widgetsContainer.barGraph();
          
          child.view.$el.css('display', 'none');
        }); 
      });

      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      this.listenTo(editorView, 'childview:options:pane', (child) => {
        
          this.listenTo(configuratorView, 'sources:configurator', (child) => {
            child.view.$el.css('display', 'none');
            App.router.navigate('/app/fuentes/', { trigger: true });
          });
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