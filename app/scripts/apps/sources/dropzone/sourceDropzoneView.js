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
      this.createElements();
    }

    createElements() {
      // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
      var previewNode = document.querySelector('#template');
      var previewTemplate = previewNode.parentNode.innerHTML;
      previewNode.parentNode.removeChild(previewNode);
       
      var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: '/target-url', // Set the url
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: '#previews', // Define the container to display the previews
        clickable: '.fileinput-button' // Define the element that should be used as click trigger to select files.
      });
       
      myDropzone.on('addedfile', function(file) {
        // Hookup the start button
        file.previewElement.querySelector('.start').onclick = function() { myDropzone.enqueueFile(file); };
      });
       
      // Update the total progress bar
      myDropzone.on('totaluploadprogress', function(progress) {
        document.querySelector('.progress-bar').style.width = progress + '%';
      });
       
      myDropzone.on('sending', function(file) {
        // And disable the start button
        file.previewElement.querySelector('.start').setAttribute('disabled', 'disabled');
      });
           
      // Setup the buttons for all transfers
      // The 'add files' button doesn't need to be setup because the config
      // `clickable` has already been specified.
      document.querySelector('#actions .start').onclick = function() {
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
      };
      
      document.querySelector('#actions .cancel').onclick = function() {
        myDropzone.removeAllFiles(true);
      };
    }
  }

  Views.SourceDropzoneView = SourceDropzoneView;
});