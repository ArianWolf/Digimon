import App from 'app';
import './userFormView';

App.module('Users.New', function(New, App, Backbone, Marionette) {
  'use strict';

  class UserNew extends Marionette.Object {
    showUser(user) {
      var region = this.getOption('region');
      var formView = new New.Views.UserFormView({ model: user });

      this.listenTo(formView, 'save', this._saveUser);
      this.listenTo(formView, 'cancel', this._cancel, this);

      region.show(formView);
    }

    _saveUser(view) {
      // TODO: Validate that password and password confirm match when
      // backend support be available

      // TODO: call save from user when backend support be available

      this._redirectToUserSaved(view.model);
    }

    _cancel() {
      App.router.navigate('/app/usuarios/', { trigger: true });
    }

    _redirectToUserSaved(user) {
      //TODO: Until model has an id, cid will be used
      // Model will have id until backend be supported
      App.router.navigate('/app/usuarios/' + user.cid + '/editar/', {
        trigger: true
      });
    }
  }

  New.UserNew = UserNew;
});

        