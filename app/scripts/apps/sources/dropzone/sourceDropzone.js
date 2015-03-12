import App from 'app';
import './sourceDropzoneView';

App.module('Sources.Dropzone', function(Dropzone, App, Backbone, Marionette) {
  'use strict';

  class SourceDropzone extends Marionette.Object {
    showDropzone() {
      var region = this.getOption('region');
      var dropzoneView = new Dropzone.Views.SourceDropzoneView();
      region.show(dropzoneView);
    }
  }

  Dropzone.SourceDropzone = SourceDropzone;
});