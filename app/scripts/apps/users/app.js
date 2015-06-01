import App from 'app';
import './entities';
import './list/userList';
import './new/userNew';
import './profile/userProfile';

App.module('Users', function(Users, App, Backbone, Marionette) {
  'use strict';

  // TODO: Users mocked will be added to show something on user list
  // drop them when backend be supported
  var mockedUsers = [{
    id: '10',
    firstname: 'David',
    lastname: 'Nester',
    username: 'david',
    email: 'david@example.com',
    password: 'default',
    confirm: 'default'
  }, {
    id: '11',
    firstname: 'Anne',
    lastname: 'Simons',
    username: 'anne',
    email: 'asimons@example.com',
    password: 'default',
    confirm: 'default'
  }];

  class UsersAPI extends Marionette.Object {
    showUserList() {
      // TODO: When backend be supported remove parameter 'mockedUsers'
      var users = new Users.Entities.UserCollection(mockedUsers);
      var userList = new Users.List.UserList({ region: this.getOption('region') });

      userList.showUsers(users);

      // TODO: Fetch disabled temporary until backend support
      /*users.fetch({
        success: _.bind(function() {
          userList = new Users.List.UserList();
          userList.showUsers(users, this.getOption('region'));
        }, this)
      });*/
    }

    showUserById(userId) {
      var user = new Users.Entities.User({id: userId});

      this._showUser(user);

      // TODO: Fetch disabled temporary until backend support
      /*user.fetch({
          success: _.bind(function() {
            this._showUser(user);
          }, this)
      });*/
    }

    showNewUser() {
      var user = new Users.Entities.User();
      var userNew = new Users.New.UserNew({
        region: this.getOption('region')
      });

      userNew.showUser(user);

      // TODO: Fetch disabled temporary until backend support
      /*user.fetch({
          success: _.bind(function() {
            this._showUser(user);
          }, this)
      });*/
    }

    deleteUser(userId) {
      var user = new Users.Entities.User({id: userId});

      user.destroy();
      App.router.navigate('/Users', {trigger: true});
    }

    _showUser(user) {
      var userEditor = new Users.Editor.UserEditor({ region: this.getOption('region') });

      userEditor.showUser(user);
    }
    
    showProfile(){
      var userProfile = new Users.Profile.UserProfile({ 
        region: this.getOption('region'),
        collection: this._getAvailableOptions()
      });
      userProfile.showUserProfile();
    }

    _getAvailableOptions() {
      return new Users.Entities.UserListCollection([
        { id: '1', name: 'Marco Antonio Fernéndez'},
        { id: '2', name: 'Adinael Pérez Ruelas'},
        { id: '3', name: 'Jessica Marisol Duarte'},
        { id: '4', name: 'Jorge Andres Bustamante'},
        { id: '5', name: 'José Luis Hernández'},
        { id: '6', name: 'Pamela Urtuzuastegui'},
        { id: '7', name: 'Pedro Miguel Allende'},
        { id: '8', name: 'Fernando Alonso Jiménez'},
        { id: '9', name: 'Helena Adianez Rocha'},
        { id: '10', name: 'Javier Pacheco Rodriguez'},
      ]);
    }
  }

  Users.on('start', function(options) {
    Users.controller = new UsersAPI(options);
  });

  Users.on('stop', function() {
    if (Users.controller) {
      Users.controller.destroy();
      delete Users.controller;
    }
  });
});
