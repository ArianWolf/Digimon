import App from 'app';
import tableItemTemplate from 'apps/users/list/templates/tableItem';
import tableTemplate from 'apps/users/list/templates/table';
import emptyTableTemplate from 'apps/users/list/templates/emptyTable';

App.module('Users.List.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class UserEmptyView extends Marionette.ItemView {
    constructor(...rest) {
      this.tagName = 'tr';
      this.template = emptyTableTemplate;
      super(...rest);
    }
  }

  class UserItemView extends Marionette.ItemView {
    constructor(...rest) {
      this.tagName = 'tr';
      this.template = tableItemTemplate;
      super(...rest);
    }
  }

  class UserListView extends Marionette.CompositeView {
    constructor(...rest) {
      this.childView = UserItemView;
      this.emptyView = UserEmptyView;
      this.childViewContainer = 'tbody';
      this.template = tableTemplate;
      super(...rest);
    }
  }

  Views.UserListView = UserListView;
});
