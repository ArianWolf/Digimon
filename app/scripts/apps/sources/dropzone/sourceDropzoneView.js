import 'dropzone';
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

    }
  }

  Views.SourceDropzoneView = SourceDropzoneView;
});
