import App from 'app';

App.module('Dashboards.Entities', function(Entities, App, Backbone){
  'use strict';

  class Dashboard extends Backbone.Model {
    constructor(...rest) {
      this.validation = {
        nombre: { required: true },
        descripcion: { required: true }
      };
      super(...rest);
    }
  }

  class DashboardsCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = Dashboard;
      super(...rest);
    }
  }

  class Widget extends Backbone.Model {
    constructor(...rest) {
      this.validation = {
        titulo: { required: true }
      };
      super(...rest);
    }
  }

  Entities.Dashboard = Dashboard;
  Entities.DashboardsCollection = DashboardsCollection;
  Entities.Widget = Widget;
});