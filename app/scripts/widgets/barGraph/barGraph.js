import Marionette from 'backbone.marionette';
import BarGraphView from './barGraphView';

export default class BarGraph extends Marionette.Object {
  constructor(...rest) {
    this.barGraphView = null;
    super(...rest);
  }

  show(region) {
    this.barGraphView = new BarGraphView();

    region.show(this.barGraphView);
  }
}