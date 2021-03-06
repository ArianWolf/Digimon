import App from 'app';
import userProfileTemplate from 'apps/users/profile/templates/userProfile';
import userListItemTemplate from 'apps/users/profile/templates/userListItem';

App.module('Users.Profile.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class UserProfileView extends Marionette.LayoutView {
    constructor(...rest) {
      this.template = userProfileTemplate;
      this.regions = { userList: '.user-list' }
      this.triggers = { 
        'click #edit-info': 'edit:info',
        'click #edit-pass': 'edit:pass',
        'click #create-group': 'create:group',
        'click #complete-edit-pass': 'complete:pass',
        'click #complete-edit-save': 'complete:save'
      }
      super(...rest);
    }
  }

  class UserListItem extends Marionette.ItemView {
    constructor(...rest) {
      this.template = userListItemTemplate;
      this.triggers = { 'click .add': 'add:user' }
      super(...rest);
    }
  }

  class UserList extends Marionette.CollectionView {
    constructor(...rest) {
      this.childView = UserListItem;
      super(...rest);
    }
  }

  Views.UserProfileView = UserProfileView;
  Views.UserList = UserList;
});