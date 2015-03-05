import App from 'app';
import dashboardFormEditor from 'apps/dashboards/editor/templates/editForm';

App.module('Dashboards.Editor.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class EditFormView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = dashboardFormEditor;
      
      super(...rest);
    }

    onShow() {
      this.stickit();
    }
  }

  Views.EditFormView = EditFormView;
});