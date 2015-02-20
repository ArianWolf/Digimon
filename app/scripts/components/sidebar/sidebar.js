import Marionette from 'backbone.marionette';
import SidebarView from './sidebarView';

export default class Sidebar extends Marionette.Object {
  constructor(...rest) {
    super(...rest);
  }

  show() {
    var sidebarView = new SidebarView();
    sidebarView.render();
  }
}
