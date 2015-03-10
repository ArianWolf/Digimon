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
        createImageThumbnails: false,
        maxFiles: 2,
        clickable: '.clickable-dropzone',
        init: function() {
          this.on('drop', function(file) { 

          });
        }
      };
    }
  }

  Views.SourceDropzoneView = SourceDropzoneView;
});
