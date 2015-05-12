import Marionette from 'backbone.marionette';
import BarGraphView from './barGraphView';

export default class BarGraph extends Marionette.Object {
  show(region, color, color2) {
    var barGraphView = new BarGraphView({
    	'region': region,
    	'color': color,
    	'color2': color2
	});

    region.show(barGraphView);
  }
}