import Marionette from 'backbone.marionette';
import RealtimeGraphView from './realtimeGraphView';

export default class RealtimeGraph extends Marionette.Object {
  show(region, color1, color2) {
    var realtimeGraphView = new RealtimeGraphView({
    	'region': region,
    	'color1': color1,
    	'color2':color2
    });
    
    region.show(realtimeGraphView);
  }
}