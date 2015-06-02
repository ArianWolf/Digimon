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
        var currentName = profileView.$('#name').html();
        var currentUsername = profileView.$('#username').html();
        var currentEmail= profileView.$('#email').html();

        var nameEdit = profileView.$('#name-edit').val(currentName);
        var usernameEdit = profileView.$('#username-edit').val(currentUsername);
        var emailEdit = profileView.$('#email-edit').val(currentEmail);


        profileView.$('#modal-edit-info').modal('show');
      });

      this.listenTo(profileView, 'edit:pass', () => {
        profileView.$('#modal-edit-pass').modal('show');
      });

      this.listenTo(profileView, 'complete:save', () => {

        var nameEdit = profileView.$('#name-edit').val();
        var usernameEdit = profileView.$('#username-edit').val();
        var emailEdit = profileView.$('#email-edit').val();



        if(nameEdit === '' || usernameEdit === '' || emailEdit === '') {
          Sweetalert("Error", "Complete todos los espacios para continuar", "error");
        } else {

          if(nameEdit.length > 27 || usernameEdit.length > 27 || emailEdit.length > 27) {
            Sweetalert("Error", "Los campos no deben superar los 27 caracteres", "error");
          } else { 
            profileView.$('#name').empty('');
            profileView.$('#name2').empty('');
            profileView.$('#username').empty('');
            profileView.$('#email').empty('');

            profileView.$('#name').html(nameEdit);
            profileView.$('#name2').html(nameEdit);
            profileView.$('#username').html(usernameEdit);
            profileView.$('#email').html(emailEdit);

            profileView.$('#modal-edit-info').modal('hide');

            Sweetalert("Éxito", "Su informacion a sido actualizada", "success");
          }
        }
      });

      this.listenTo(profileView, 'complete:pass', () => {
        var currentPass = profileView.$('#current-pass').val();
        var newPass = profileView.$('#new-pass').val();
        var reNewPass = profileView.$('#re-new-pass').val();

        if(currentPass === '' || newPass !== reNewPass || newPass === '' || reNewPass === '') {
          Sweetalert("Error", "Complete todos los campos y verifique que las nuevas contraseñas conicidan", "error");
        } else {
          Sweetalert("Éxito", "Su contraseña ha sido cambiada", "success");
          profileView.$('#modal-edit-pass').modal('hide');
          profileView.$('#current-pass').val('');
          profileView.$('#new-pass').val('');
          profileView.$('#re-new-pass').val('');
        } 
      });

      this.listenTo(profileView, 'create:group', () => {
        var groupName = profileView.$('#group-name').val();
        if(groupName !== '') {
          Sweetalert("Éxito", "Su grupo ha sido creado", "success");
          profileView.$('#group-name').val('');
        } else {
          Sweetalert("Error", "Introduzaca un nombre para el grupo", "error");
        }
        
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
  }

  Profile.UserProfile = UserProfile;
});