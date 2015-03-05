  import App from 'app';

App.module('Users', function(Users, App, Backbone, Marionette){
  'use strict';

  this.startWithParent = false;

  class UserController extends Marionette.Controller {
    listAllUsers() {
      this._loadModuleAndRun('showUserList');
    }

    showUserById(userId) {
      this._loadModuleAndRun('showUserById', userId);
    }

    showNewUser() {
      this._loadModuleAndRun('showNewUser');
    }

    deleteUser(userId) {
      this._loadModuleAndRun('deleteUser', userId);
    }

    _loadModuleAndRun(action, ...rest) {
      require(['apps/users/app'], function() {
        App.startSubApp('Users', {
          region: new Marionette.Region({ el: '#main-container' })
        });
        App.Users.controller[action](...rest);
      });
    }
  }

  App.on('before:start', function() {
    new Marionette.AppRouter({
      controller: new UserController(),
      appRoutes: {
        'app/usuarios/': 'listAllUsers',
        'app/usuarios/crear/': 'showNewUser',
        'app/usuarios/:id/editar/': 'showUserById',
        'app/usuarios/:id/eliminar/': 'deleteUser'
      }
    });
  });
});
