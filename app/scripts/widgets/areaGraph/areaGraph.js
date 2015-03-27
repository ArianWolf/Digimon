import Marionette from 'backbone.marionette';
import AreaGraphView from './areaGraphView';

export default class AreaGraph extends Marionette.Object {
  show(region) {
    var areaGraphView = new AreaGraphView({'region': region});
    
    region.show(areaGraphView);
  }
}