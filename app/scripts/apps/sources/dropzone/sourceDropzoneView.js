import 'dropzone/dist/dropzone.css';
import 'sweetalert/lib/sweet-alert.css';
import Dropzone from 'dropzone';
import SweetAlert from 'sweetalert/lib/sweet-alert';
import App from 'app';
import sourceDropzoneTemplate from 'apps/sources/dropzone/templates/sourceDropzone';

App.module('Sources.Dropzone.Views', function(Views, App, Backbone, Marionette) {
  'use strict';

  class SourceDropzoneView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = sourceDropzoneTemplate;
      this.ui = { buttonNext: '.button-next'}
      super(...rest);
    }

    onShow() {
      Dropzone.options.dropzone = {
        clickable: '.clickable-dropzone',
      };

      $(this.ui.buttonNext).on('click', function() {
        SweetAlert("Bien!",
        "Todo ha ocurrido con exito",
        "success");

        $('.confirm').on('click', function() {
          App.router.navigate('/app/dashboard/crear/', { trigger: true });
        });
      });

      // activar cuando haya servidor
      /*SweetAlert("Error!",
        "Algo anda mal",
        "error");*/
    }
  }
  Views.SourceDropzoneView = SourceDropzoneView;
});