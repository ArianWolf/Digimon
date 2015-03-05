import App from 'app';
import './sourceDropzoneView';

App.module('Sources.Dropzone', function(Dropzone, App, Backbone, Marionette) {
  'use strict';

  class SourceDropzone extends Marionette.Object {
    showDropzone() {
      var region = this.getOption('region');
      var DropzoneView = new Dropzone.Views.SourceDropzoneView();
      region.show(DropzoneView);
    }
  }

  Dropzone.SourceDropzone = SourceDropzone;
});
