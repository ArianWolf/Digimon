import App from 'app';

App.module('Users.Entities', function(Entities, App, Backbone){
  'use strict';

  class User extends Backbone.Model {
    constructor(...rest) {
      this.validation = {
        firstName: {
          require: true,
          msg: 'El nombre no debe estar vacio'
        },
        username: {
          require: true,
          msg: 'El nombre de usuario no debe estar vacio'
        },
        password: {
          require: true,
          msg: 'La contraseña no debe estar vacia'
        }
      };

      super(...rest);
    }
  }

  class UserCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = User;
      super(...rest);
    }
  }

  Entities.User = User;
  Entities.UserCollection = UserCollection;
});