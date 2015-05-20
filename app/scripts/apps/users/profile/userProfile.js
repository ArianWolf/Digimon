import App from 'app';
import './userProfileView';

App.module('Users.Profile', function(Profile, App, Backbone, Marionette) {
  'use strict';

  class UserProfile extends Marionette.Object {
    showUserProfile() {
      debugger;
      var region = this.getOption('region');
      var profileView = new Profile.Views.UserProfileView();

      region.show(profileView);
    }

  }

  Profile.UserProfile = UserProfile;
});

        