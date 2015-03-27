import App from 'app';

App.module('Dashboards.Entities', function(Entities, App, Backbone){
  'use strict';

  class Dashboard extends Backbone.Model {
    constructor(...rest) {
      super(...rest);
    }
  }

  class DashboardsCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = Dashboard;
      super(...rest);
    }
  }

  class Pane extends Backbone.Model {
    constructor(...rest) {
      super(...rest);
    }
  }

  class PaneCollection extends Backbone.Collection {
    constructor(...rest) {
      this.model = Pane;
      super(...rest);
    }
  }

  Entities.Dashboard = Dashboard;
  Entities.DashboardsCollection = DashboardsCollection;
  Entities.Pane = Pane;
  Entities.PaneCollection = PaneCollection;
});