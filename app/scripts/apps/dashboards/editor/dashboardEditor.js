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
      this.currentPane = null;
      super(...rest);
    }

    showEditor(paneCollection) {
      var _this = this;
      this.paneCollection = paneCollection;
      var region = this.getOption('region');

      //create main view container and show it
      var editorLayoutView = new Editor.Views.EditorLayoutView();
      region.show(editorLayoutView);
      
      var editorRegion = editorLayoutView.getRegion('editorContainer');
      //create editorView and show it
      var editorView = new Editor.Views.DashboardEditorView({
        collection: this.paneCollection
      });
      editorRegion.show(editorView);

      //listener for show title in preview
      editorLayoutView.$('.title').on('keyup' , function() {
        var title = editorLayoutView.$('.title').val();
        editorLayoutView.$('.title-zone').empty();
        editorLayoutView.$('.title-zone').append(title);
      });

      //listener for show graph in preview
      editorLayoutView.$('.type-widget').on('change', function() {
        var typeOfWidget = editorLayoutView.$('.type-widget').val();
        var prev = editorLayoutView.getRegion('preview');
        var graph = _this._getGraph(typeOfWidget);
        graph.show(prev, _this.color1, _this.color2);
      });

      //add a new pane
      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model();
        this.paneCollection.add(pane);
      });

      this._colorListener(editorLayoutView);

      //remove a pane selected
      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      this.listenTo(editorView, 'childview:options:pane', (pane) => {
        editorLayoutView.$('#myModal').modal('show');
        this.currentPane = pane;
      });

      editorLayoutView.$('.complete').on('click', function() {
        var title = editorLayoutView.$('.title').val();
        _this._setPaneTitle(_this.currentPane, title);
   
        var graphRegion = _this.currentPane.getRegion('body');
        var typeOfWidget = editorLayoutView.$('.type-widget').val();
        var graph = _this._getGraph(typeOfWidget);
        graph.show(graphRegion, _this.color1, _this.color2);

        editorLayoutView.$('#myModal').modal('hide');
      });

      this.listenTo(editorView, 'save:dashboard', () => {
        App.router.navigate('/app/dashboard/nuevo/', { trigger: true });
      });
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