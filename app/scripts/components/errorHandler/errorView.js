import Marionette from 'backbone.marionette';

export default class ErrorView extends Marionette.ItemView{
  constructor(...rest) {
    this.className = 'error-container text-center';
    super(...rest);
  }
}