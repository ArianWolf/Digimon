import App from 'app';
import './userTableView';

App.module('Users.List', function(List, App, Backbone, Marionette) {
  'use strict';

  class UserList extends Marionette.Object {
    showUsers(users) {
      var region = this.getOption('region');
      var listView = new List.Views.UserListView({
        collection: users
      });

      region.show(listView);
    }
  }

  List.UserList = UserList;
});
