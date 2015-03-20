import Marionette from 'backbone.marionette';
import LineGraphView from './lineGraphView';

export default class LineGraph extends Marionette.Object {
  show(region) {
    var lineGraphView = new LineGraphView();

    region.show(lineGraphView);
  }
}