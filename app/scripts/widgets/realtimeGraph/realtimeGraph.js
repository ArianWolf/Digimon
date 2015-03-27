import Marionette from 'backbone.marionette';
import RealtimeGraphView from './realtimeGraphView';

export default class RealtimeGraph extends Marionette.Object {
  show(region) {
    var realtimeGraphView = new RealtimeGraphView({'region': region});
    
    region.show(realtimeGraphView);
  }
}