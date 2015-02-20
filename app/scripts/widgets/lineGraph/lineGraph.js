import Marionette from 'backbone.marionette';
import LineGraphView from './lineGraphView';

export default class LineGraph extends Marionette.Object {
  show() {
    var region = this.getOption('region');
    var lineGraphView = new LineGraphView();
    
    region.show(lineGraphView);
  }
}