import App from 'app';
import homeTemplate from 'apps/mainpage/home/templates/homeTemplate';

App.module('Mainpage.Home.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class HomeView extends Marionette.ItemView {
    constructor(...rest) {
      this.template = homeTemplate;
      super(...rest);
    }

    onShow() {

    }
  }

  Views.HomeView = HomeView;
});