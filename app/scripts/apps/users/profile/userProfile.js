import App from 'app';
import './profileView';

App.module('Users.Profile', function(Profile, App, Backbone, Marionette) {
  'use strict';

  class UserProfile extends Marionette.Object {
    showUserProfile() {
      debugger;
      var region = this.getOption('region');
      var profileView = new Profile.Views.ProfileView();

      region.show(profileView);
    }

  }

  Profile.UserProfile = UserProfile;
});

        