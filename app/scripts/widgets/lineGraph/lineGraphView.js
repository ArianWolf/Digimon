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
    var _regionPane = this.getOption('region');

    this._createGraph(_regionPane);

    var _this = this;

    $('#main-container').on('mouseup', function() {
      _this._createGraph(_regionPane);
    });


    $('#main-container').on('mousemove', function() { 
      _this._createGraph(_regionPane);
    });
  }

  _createGraph(region) {
    new Chartist.Line('.ct-chart' , {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [ [12, 9, 7, 8, 5], [2, 1, 3.5, 7, 3], [1, 3, 4, 5, 6]] }, {
      fullWidth: true,
      height: region.$el.height(),
      chartPadding: { right: 40, top: 20}
    });
  }
}