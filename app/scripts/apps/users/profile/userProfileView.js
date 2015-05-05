import App from 'app';
import userProfileTemplate from 'apps/users/profile/templates/userProfile';

App.module('Users.Profile.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class UserProfileView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = userProfileTemplate;
      super(...rest);
    }

    onShow() {
      debugger;
    }
  }

  Views.UserProfileView = UserProfileView;
});