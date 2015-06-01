import 'sweetalert/lib/sweet-alert.css';
import Sweetalert from 'sweetalert';
import App from 'app';
import './userProfileView';

App.module('Users.Profile', function(Profile, App, Backbone, Marionette) {
  'use strict';

  class UserProfile extends Marionette.Object {
    showUserProfile() {
      var region = this.getOption('region');
      var profileView = new Profile.Views.UserProfileView();

      region.show(profileView);

      var regionList = profileView.getRegion('userList');
      var userListView = new Profile.Views.UserList({
        collection: this.getOption('collection')
      });

      regionList.show(userListView);

      this.listenTo(profileView, 'edit:info', () => {
        this._changeDisableStatus(profileView, false);

        profileView.$('#firstname').focus();
      });

      this.listenTo(profileView, 'save:info', () => {
        this._changeDisableStatus(profileView, true);
        Sweetalert("Éxito", "Su información ha sido guardada", "success")
      });

      this.listenTo(userListView, 'childview:add:user', (child) => {
        child.$('.add').css('background-color', '#0E8C19');
        child.$('.add').empty();
        var icono = $('<i>').addClass('fa fa-check');
        child.$('.add').append(icono);
      });
    }

    _changeDisableStatus(view , value){
      view.$('#firstname').prop('disabled', value);
      view.$('#lastname').prop('disabled', value);
      view.$('#username').prop('disabled', value);
      view.$('#password').prop('disabled', value);
      view.$('#confirm').prop('disabled', value);
      view.$('#email').prop('disabled', value);
      view.$('#save').prop('disabled', value);
    }
  }

  Profile.UserProfile = UserProfile;
});