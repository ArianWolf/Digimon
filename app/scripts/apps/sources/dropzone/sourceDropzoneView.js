import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import App from 'app';
import sourceDropzoneTemplate from 'apps/sources/dropzone/templates/sourceDropzone';

App.module('Sources.Dropzone.Views', function(Views, App, Backbone, Marionette) {
  'use strict';

  class SourceDropzoneView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = sourceDropzoneTemplate;
      super(...rest);
    }

    onShow() {
      Dropzone.options.dropzone = {
        maxFiles: 1,
        init: function() {
          this.on("drop", function(file) { 
            debugger; 
          });
        }
      };
    }
  }

  Views.SourceDropzoneView = SourceDropzoneView;
});
