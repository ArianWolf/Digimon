import 'chartist/dist/chartist.min.css';
import Chartist from 'chartist/dist/chartist';
import Marionette from 'backbone.marionette';
import lineGraphTemplate from 'widgets/lineGraph/templates/lineGraph';

export default class BarGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.template = lineGraphTemplate;
    super(...rest);
    this.isAlive = true;
  }

  onShow() {
    var _this = this;
    var _regionPane = this.getOption('region');

    this._createGraph(_regionPane);

    this._changeAliveStatus(_this);

    $('.resize').on('click', function() {
      _this._createGraph(_regionPane);
    });

    $('#main-container').on('mouseup', function() {
      if(_this.isAlive === true) {
        _this._createGraph(_regionPane);
      }
    });

    $('#main-container').on('mousemove', function() {
      if(_this.isAlive === true) {
        _this._createGraph(_regionPane);
      }
    });  
  }

  _changeAliveStatus(_this) {
    $('.remove').on('click', function() {
      _this.isAlive = false;
    });
  }

  _createGraph(region) {
    new Chartist.Line('.ct-chart' , {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [ [12, 9, 7, 8, 5], [2, 1, 3.5, 7, 3], [1, 3, 4, 5, 6]] }, {
      fullWidth: true,
      height: region.$el.height()-100,
      chartPadding: { right: 40, top: 20}
    });
  }
}