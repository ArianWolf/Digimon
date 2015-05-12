import App from 'app';
import './dashboardEditorView';
import './dashboardPaneConfiguratorView';
import widgetsContainer from '../../../widgets/widgetsContainer';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.paneCollection = null;
      this.widgetsContainer = widgetsContainer;
      this.colorPalette = {
        red: 'red',
        blue: 'blue',
        green: 'green',
        pink: 'pink',
      }
      this.color1 = 'steelblue';
      this.color2 = 'lightblue';
      super(...rest);
    }

    showEditor(paneCollection) {
      var _this = this;
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

        configuratorView.$('.title').on('keyup' , function() {
          var title = configuratorView.$('.title').val();
          configuratorView.$('.title-zone').empty();
          configuratorView.$('.title-zone').append(title);
        });
        
        configuratorView.$('.type-widget').on('change', function() {
          var typeOfWidget = configuratorView.$('.type-widget').val();
          var prev = configuratorView.getRegion('preview');
          var graph = _this._getGraph(typeOfWidget);
          graph.show(prev, _this.color1, _this.color2);
        });

        this._colorListener(configuratorView);

        this.listenTo(configuratorView, 'complete:configurator', (child) => {
          var title = this._getConfiguratorTitle(child);
          this._setPaneTitle(_paneChild, title);
     
          var graphRegion = _paneChild.getRegion('body');
          var typeOfWidget = this._getTypeOfWidgetToShow(child); 
          var graph = this._getGraph(typeOfWidget);
          graph.show(graphRegion, this.color1, this.color2);

          child.view.$el.css('display', 'none');
        }); 
      });

      this.listenTo(editorView, 'save:dashboard', () => {
        App.router.navigate('/app/dashboard/nuevo/', { trigger: true });
      });

      region.show(editorView);
    }

    _printColor(configuratorView, color1, color2) {
        var graphRegion = configuratorView.getRegion('preview');
        var typeOfWidget = configuratorView.$('.type-widget').val();
        var graph = this._getGraph(typeOfWidget);
        graph.show(graphRegion, color1, color2);
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

    _colorListener(configuratorView) {
      var _this = this;

      configuratorView.$('#red1').on('click', function() {
        _this.color1 = _this.colorPalette['red'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#blue1').on('click', function() {
        _this.color1 = _this.colorPalette['blue'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#green1').on('click', function() {
        _this.color1 = _this.colorPalette['green'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#pink1').on('click', function() {
        _this.color1 = _this.colorPalette['pink'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#red2').on('click', function() {
        _this.color2 = _this.colorPalette['red'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#blue2').on('click', function() {
        _this.color2 = _this.colorPalette['blue'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#green2').on('click', function() {
        _this.color2 = _this.colorPalette['green'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });

      configuratorView.$('#pink2').on('click', function() {
        _this.color2 = _this.colorPalette['pink'];
        _this._printColor(configuratorView, _this.color1, _this.color2);
      });
    }
  }

  Editor.DashboardEditor = DashboardEditor;
});