import 'chartist/dist/chartist.min.css';
import Chartist from 'chartist/dist/chartist';
import Marionette from 'backbone.marionette';
import lineGraphTemplate from 'widgets/lineGraph/templates/lineGraph';

export default class BarGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.template = lineGraphTemplate;
    this.ui = {
      'graph': '.rickshaw-stacked-bars'
    };

    super(...rest);
  }

  onShow() {

    this._createGraph();

    var _this = this;

    $('#main-container').on('mouseup', function() {
      _this._createGraph();
    });


    $('#main-container').on('mousemove', function() { 
      _this._createGraph();
    });

  }

  _createGraph() {
    new Chartist.Line('.ct-chart' , {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [ [12, 9, 7, 8, 5], [2, 1, 3.5, 7, 3], [1, 3, 4, 5, 6]] }, {
      fullWidth: true,
      height: $('.panel-body').height(),
      chartPadding: { right: 40, top: 20}
    });
  }
}