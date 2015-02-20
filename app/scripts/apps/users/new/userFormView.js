import App from 'app';
import formTemplate from 'apps/users/new/templates/form';
import 'backbone.stickit';
import 'backbone.validation';

App.module('Users.New.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class UserFormView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = formTemplate;
      this.className = 'wrapper wrapper-content animated fadeInRight clearfix';
      this.bindings = {
        '#firstname': 'firstName',
        '#lastname': 'lastName',
        '#username': 'username',
        '#email': 'email',
        '#password': 'password',
        '#confirm': 'confirm'
      };
      this.triggers = {
        'click .save': 'save',
        'click .cancel': 'cancel'
      };
      super(...rest);
    }

    initialize() {
      Backbone.Validation.bind(this);
    }

    onShow() {
      this.stickit();
    }
  }

  Views.UserFormView = UserFormView;
});