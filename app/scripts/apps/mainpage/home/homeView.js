import App from 'app';
import homeTemplate from 'apps/mainpage/home/templates/homeTemplate';
import homeItemTemplate from 'apps/mainpage/home/templates/homeItemTemplate';

App.module('Mainpage.Home.Views', function (Views, App, Backbone, Marionette) {
  'use strict';

  class HomeView extends Marionette.ItemView {
    constructor(...rest) {
      this.className = 'mainpage-box';
      this.template = homeItemTemplate;
      super(...rest);
    }
  }

  class HomeCollectionView extends Marionette.CollectionView {
    constructor(...rest) {
      this.childView = HomeView;
      super(...rest);
    }
  }

  class HomeLayoutView extends Marionette.LayoutView {
    constructor(...rest) {
      this.template = homeTemplate;
      this.regions = { itemContainer: '#mainpage-body' };
      super(...rest);
    }
  }

  Views.HomeCollectionView = HomeCollectionView;
  Views.HomeLayoutView = HomeLayoutView;
});