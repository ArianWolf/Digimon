import App from 'app';
import './dashboardEditorView';
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

      //render preview empty for first time
      this._renderEmptyPreviewView(editorLayoutView);

      //listener for show title in preview
      this._showTitleOnPreview(editorLayoutView);

      //listener for show graph in preview
      this._showWidgetOnPreview(editorLayoutView, _this)

      //add a new pane
      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model();
        this.paneCollection.add(pane);
      });

      //redirect to save dashboard save
      this.listenTo(editorView, 'save:dashboard', () => {
        App.router.navigate('/app/dashboard/nuevo/', { trigger: true });
      });

      this._colorListener(editorLayoutView);

      //remove a pane selected
      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });
      //clean the configurator when other pane is selected
      this.listenTo(editorView, 'childview:options:pane', (pane) => {
        editorLayoutView.$('#myModal').modal('show');
        
        if(pane != this.currentPane) {
          editorLayoutView.$('.title').val('');
          editorLayoutView.$('.title-zone').empty();
          this.color1 = 'steelblue';
          this.color2 = 'lightblue';

          this._renderEmptyPreviewView(editorLayoutView);
        } 

        this.currentPane = pane;
      });

      //Set to the selected pane, the information from configurator
      editorLayoutView.$('.complete').on('click', function() {
        _this._printInformationOnPane(editorLayoutView, _this);
      });
    
      editorLayoutView.$('.modal').on('keyup', function(event) {
        if(event.keyCode === 13) {
          _this._printInformationOnPane(editorLayoutView, _this);
        }
      });
    }  

    _printColor(View, color1, color2) {
        var graphRegion = View.getRegion('preview');
        var typeOfWidget = View.$('.type-widget').val();
        var graph = this._getGraph(typeOfWidget);
        graph.show(graphRegion, color1, color2);
    }

    _setPaneTitle(pane, title) {
      pane.$('.panel-title').html(title);
    }

    _getGraph(typeOfWidget) {
      return new this.widgetsContainer[typeOfWidget]();
    }

    _renderEmptyPreviewView(view) {
      var previewEmptyView = new Editor.Views.PreviewEmptyView();
      var previewEmptyRegion = view.getRegion('preview');
      previewEmptyRegion.show(previewEmptyView);
    }

    _showTitleOnPreview(view) {
      view.$('.title').on('keyup' , function() {
        var title = view.$('.title').val();
        view.$('.title-zone').empty();
        view.$('.title-zone').append(title);
      });
    }

    _showWidgetOnPreview(view, _this) {
      view.$('.type-widget').on('change', function() {
        var typeOfWidget = view.$('.type-widget').val();
        var preview = view.getRegion('preview');
        var graph = _this._getGraph(typeOfWidget);
        graph.show(preview, _this.color1, _this.color2);
      });
    }

    _printInformationOnPane(view, _this) {
        var title = view.$('.title').val();
        _this._setPaneTitle(_this.currentPane, title);
   
        var graphRegion = _this.currentPane.getRegion('body');
        var typeOfWidget = view.$('.type-widget').val();
        var graph = _this._getGraph(typeOfWidget);
        graph.show(graphRegion, _this.color1, _this.color2);

        view.$('#myModal').modal('hide');
    }

    _colorListener(View) {
      var _this = this;

      View.$('#red1').on('click', function() {
        debugger;
        _this.color1 = _this.colorPalette['red'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#blue1').on('click', function() {
        _this.color1 = _this.colorPalette['blue'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#green1').on('click', function() {
        _this.color1 = _this.colorPalette['green'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#pink1').on('click', function() {
        _this.color1 = _this.colorPalette['pink'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#red2').on('click', function() {
        _this.color2 = _this.colorPalette['red'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#blue2').on('click', function() {
        _this.color2 = _this.colorPalette['blue'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#green2').on('click', function() {
        _this.color2 = _this.colorPalette['green'];
        _this._printColor(View, _this.color1, _this.color2);
      });

      View.$('#pink2').on('click', function() {
        _this.color2 = _this.colorPalette['pink'];
        _this._printColor(View, _this.color1, _this.color2);
      });
    }
  }

  Editor.DashboardEditor = DashboardEditor;
});