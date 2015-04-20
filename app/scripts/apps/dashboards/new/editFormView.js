import App from 'app';
import dashboardFormEditor from 'apps/dashboards/new/templates/editForm';

App.module('Dashboards.New.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class EditFormView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = dashboardFormEditor;
      this.triggers = { 'click #save': 'save:edit' };
      super(...rest);
    }

    onshow () {
    }
  }

  Views.EditFormView = EditFormView;
});