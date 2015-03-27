import 'rickshaw/rickshaw.css';
import Rickshaw from 'rickshaw';
import Marionette from 'backbone.marionette';
import areaGraphTemplate from 'widgets/areaGraph/templates/areaGraph';

export default class AreaGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.template = areaGraphTemplate;
    this.ui = {
      'graph': '.rickshaw-slider',
      'yAxis': '.rickshaw-slider .y_axis'
    };

    super(...rest);
  }

  onShow() {
    var _regionPane = this.getOption('region');

    var seriesData = this._createRandomData();
    
    var graph = this._createGraph(seriesData, _regionPane);
    this._configureWidth(graph, _regionPane);
    this._createYAxis(graph);
    this._setHoverDatail(graph);
    this._setxTicks(graph);

    graph.render();

    this._reziseOnPanelSizeChange(graph, _regionPane);

    $('#rickshaw-slider .rickshaw-chart').data('chart', graph);
  }

  _createRandomData() {
    var seriesData = [ [] ];
    var random = new Rickshaw.Fixtures.RandomData(50);

    for (var i = 0; i < 75; i++) {
      random.addData(seriesData);
    }

    return seriesData;
  }

  _createGraph(seriesData, region) {
    return new Rickshaw.Graph({
      element: this.ui.graph[0],
      renderer: 'multi',
      dotSize: 5,
      height: region.$el.height(),
      padding: {
        left: 0.5
      },
      series: [{
        name: 'Temperature',
        data: seriesData.shift(),
        color: 'steelblue', 
        opacity: 0,
        renderer: 'stack'
      }]
    });
  }

  _configureWidth(graph, region) {
     graph.configure({
      width: region.$el.width(),
    });
  }

  _createYAxis(graph) {
   new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'left',
      pixelsPerTick: 50,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: this.ui.yAxis[0]
    });
  }

  _setHoverDatail(graph) {
    new Rickshaw.Graph.HoverDetail({
      graph: graph,
      formatter: function(series, x, y) { 
        var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>'; // jshint ignore:line
        var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>'; // jshint ignore:line
        var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date; // jshint ignore:line
        return content;
      }
    });
  }

  _setxTicks(graph) {
    new Rickshaw.Graph.Axis.Time({
      graph: graph,
      timeFixture: new Rickshaw.Fixtures.Time()
    });
  }

  _reziseOnPanelSizeChange(graph, region){
    $('#main-container').on('mouseup', function() {
      graph.configure({
        width: region.$el.width(),
        height: region.$el.height()
      });

      graph.render();
    });

    $('#main-container').on('mousemove', function() {
      graph.configure({
        width: region.$el.width(),
        height: region.$el.height()
      });

      graph.render();
    });  
  }
}