import App from 'app';
import './dashboardEditorView';
import './editFormView';
import './dashboardPaneConfiguratorView';
import widgetsContainer from '../../../widgets/widgetsContainer';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.paneCollection = null;
      this.widgetsContainer = widgetsContainer;
      super(...rest);
    }

    showEditor(paneCollection) {
      this.paneCollection = paneCollection;
      var region = this.getOption('region');
      var editorView = new Editor.Views.DashboardEditorView({
        collection: this.paneCollection
      });

      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model();
        this.paneCollection.add(pane);
      });

      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      this.listenTo(editorView, 'childview:options:pane', (child) => {
        var configuratorView = new Editor.Views.ConfiguratorView();
        this._showConfigurator(configuratorView);

        var _paneChild = child;

        this.listenTo(configuratorView, 'complete:configurator', (child) => {
          var title = this._getConfiguratorTitle(child);
          this._setPaneTitle(_paneChild, title);
     
          var graphRegion = _paneChild.getRegion('body');
          var typeOfWidget = this._getTypeOfWidgetToShow(child); 
          var graph = this._getGraph(typeOfWidget);
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

    _showConfigurator(configuratorView) {
      var region = this.getOption('modal');
      region.show(configuratorView);
    }

    _getConfiguratorTitle(child) {
      return child.view.$('.title').val();
    }

    _setPaneTitle(pane, title) {
      pane.$('.panel-title').html(title);
    }

    _getTypeOfWidgetToShow(child) {
      return  child.view.$('.type-widget').val();
    }

    _getGraph(typeOfWidget) {
      return new this.widgetsContainer[typeOfWidget]();
    }
  }

  Editor.DashboardEditor = DashboardEditor;
});