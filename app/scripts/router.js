import Backbone from 'backbone';

export default class CommonRouter extends Backbone.Router {
  constructor(...rest) {
    this.routes = { '': 'home' };
    super(...rest);
  }

  home() {
    this.navigate('/app', { trigger: true });
  }
}