import Marionette from 'backbone.marionette';

export default class SidebarView extends Marionette.ItemView {
  constructor(...rest) {
    this.el = '.page-sidebar';
    this.template = false;
    super(...rest);
  }
}
