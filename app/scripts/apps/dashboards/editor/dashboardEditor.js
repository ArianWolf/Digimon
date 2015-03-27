import App from 'app';
import './dashboardEditorView';
import './editFormView';
import './dashboardConfiguratorView';
import widgetsContainer from '../../../widgets/widgetsContainer';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.paneCollection = null;
      this.widgetsContainer = widgetsContainer;
      this.count = 0;
      super(...rest);
    }

    showEditor(paneCollection) {
      this.paneCollection = paneCollection;
      var region = this.getOption('region');
      var editorView = new Editor.Views.DashboardEditorView({
        collection: this.paneCollection
      });

      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model;
        this.paneCollection.add(pane);
      });

      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      this.listenTo(editorView, 'childview:options:pane', (child) => {
          var region = this.getOption('modal');
          var configuratorView = new Editor.Views.ConfiguratorView();
          region.show(configuratorView);

          this.child = child;

          this.listenTo(configuratorView, 'complete:configurator', (child) => {
            debugger;

            

            var title = child.view.$('.title').val();
            this.child.$('.panel-title').html(title);

            var graphRegion = this.child.regions.body;
            var graph = new this.widgetsContainer.lineGraph();
            graph.show(graphRegion);

            child.view.$el.css('display', 'none');


          }); 
        
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