import Marionette from 'backbone.marionette';
import appLayoutTemplate from 'templates/appLayout';

export default class AppLayout extends Marionette.LayoutView {
  constructor(...rest) {
    this.template = appLayoutTemplate;
    this.regions = {
      mainContainer: '#main-container',
      sidebar: '#sidebar-container',
      modal: '#modal'
    };
    super(...rest);
  }

}
