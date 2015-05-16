import 'sweetalert/lib/sweet-alert.css';
import Sweetalert from 'sweetalert';
import App from 'app';
import './dashboardEditorView';
import widgetsContainer from '../../../widgets/widgetsContainer';

App.module('Dashboards.Editor', function(Editor, App, Backbone, Marionette) {
  'use strict';

  class DashboardEditor extends Marionette.Object {
    constructor(...rest) {
      this.paneCollection = null;
      this.widgetsContainer = widgetsContainer;
      this.color1 = 'black';
      this.color2 = 'black';
      this.currentPane = null;
      this.lineFlag = true;
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
      this._showWidgetOnPreview(editorLayoutView, _this);

      //add a new pane
      this.listenTo(editorView, 'add:pane', () => {
        var pane = new Backbone.Model();
        this.paneCollection.add(pane);
      });

      //redirect to save dashboard save
      this.listenTo(editorView, 'save:dashboard', () => {
        var saveRegion = editorLayoutView.getRegion('save');
        var saveDashboardView = new Editor.Views.SaveDashboard();

        saveRegion.show(saveDashboardView);

        editorLayoutView.$('.add').css('display', 'none');
        editorLayoutView.$('.save').css('display', 'none');

        editorLayoutView.$('#back').on('click', function() {
          saveRegion.empty();
          
          editorLayoutView.$('.add').css('display', 'inline');
          editorLayoutView.$('.save').css('display', 'inline');
        })


        //App.router.navigate('/app/dashboard/nuevo/', { trigger: true });
      });

      //remove a pane selected
      this.listenTo(editorView, 'childview:remove:pane', (child) => {
        child.model.destroy();
      });

      //listen for the change color and change it on preview
      this._linstenForChangeColor('#sc1', editorLayoutView, _this);
      this._linstenForChangeColor('#sc2', editorLayoutView, _this);

      //clean the configurator when other pane is selected
      this.listenTo(editorView, 'childview:options:pane', (pane) => {
        editorLayoutView.$('#myModal').modal('show');
        
        if(pane !== this.currentPane) {
          this._cleanModalPane(editorLayoutView);

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

    _cleanModalPane(view) { 
      view.$('.title').val('');
      view.$('.title-zone').empty();
      view.$('.type-widget').val('Widgets...');
      view.$('#sc1').css('background-color', '#FFFFFF');
      view.$('#sc2').css('background-color', '#FFFFFF');
      view.$('#sc1').val('Colores...');
      view.$('#sc2').val('Colores...');
      this.color1 = 'steelblue';
      this.color2 = 'lightblue';

      this._renderEmptyPreviewView(view);
    }

    _printColor(View, color1, color2) {
        var graphRegion = View.getRegion('preview');
        var typeOfWidget = View.$('.type-widget').val();
        var graph = this._getGraph(typeOfWidget);
        if(graph !== null){
          graph.show(graphRegion, color1, color2);
        }
    }

    _linstenForChangeColor(selector, view, _this) {
      view.$(selector).on('change', function() {
        if(selector === '#sc1') {
          _this.color1 = view.$(selector).val();
          view.$(selector).css('background-color', _this.color1);
        } else {
          _this.color2 = view.$(selector).val();
          view.$(selector).css('background-color', _this.color2);
        }
        view.$(selector).val('');
        _this._printColor(view, _this.color1, _this.color2);
      });
    }

    _setPaneTitle(pane, title) {
      pane.$('.panel-title').html(title);
    }

    _getGraph(typeOfWidget) {
      if(typeOfWidget === 'Widgets...') {
        return null;
      }
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

        if(graph !== null){
          graph.show(preview, _this.color1, _this.color2);
        }
      });
    }

    _printInformationOnPane(view, _this) {
      var title = view.$('.title').val();
      _this._setPaneTitle(_this.currentPane, title);
 
      var graphRegion = _this.currentPane.getRegion('body');
      var typeOfWidget = view.$('.type-widget').val();

      var graph = _this._getGraph(typeOfWidget);

      if(graph !== null){
        graph.show(graphRegion, this.color1, this.color2);
      }

      view.$('#myModal').modal('hide');
    }
  }

  Editor.DashboardEditor = DashboardEditor;
});