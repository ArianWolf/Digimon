import Marionette from 'backbone.marionette'
import BarGraphView from './barGraphView';

export default class BarGraph extends Marionette.Object {
  show() {
    var region = this.getOption('region');
    var barGraphView = new BarGraphView();

    region.show(barGraphView);
  }
}