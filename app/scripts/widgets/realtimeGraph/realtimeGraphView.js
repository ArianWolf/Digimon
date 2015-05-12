import 'rickshaw/rickshaw.css';
import Rickshaw from 'rickshaw';
import Marionette from 'backbone.marionette';
import realtimeGraphTemplate from 'widgets/realtimeGraph/templates/realtimeGraph';

export default class RealtimeGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.template = realtimeGraphTemplate;
    this.ui = {
      'graph' : '.rickshaw-realtime',
      'yAxis' : 'rickshaw-realtime_y_axis',
      'yAxisLine' : '#rickshaw-realtime_y_axis .tick.major line',
      'YAxisText' : '#rickshaw-realtime_y_axis .tick.major text'
    };
    
    super(...rest);
  }

  onShow() {
    var _regionPane = this.getOption('region');

    var _color1 = this.getOption('color1');
    var _color2 = this.getOption('color2');

    var data = this._getRandomData();

    var graph = this._createGraph(data, _regionPane, _color1, _color2);
    this._createYAxis(graph);
    this._setHoverDetails(graph);

    this._updateGraphRealtime(graph, data);

    this._resizeGraphOnPanelChange(graph, _regionPane);

    $(this.ui.graph).data('chart', graph);
  }

  _getRandomData() {
    var random = new Rickshaw.Fixtures.RandomData(100);
    var data = [ [], [], [] ];
          
    for (var i = 0; i < 50; i++) {
      random.addData(data);
    }

    return data;
  }

  _createGraph(data, region, color1, color2) {
    return new Rickshaw.Graph({
      element: this.ui.graph[0],
      height: region.$el.height(),
      renderer: 'area',
      padding: { top: 0.5 },
      series: [{
        data: data[0],
        color: color1, 
        name: 'DB Server'
      }, {
        data: data[1],
        color: color2, 
        name: 'Web Server'
      }]
    });
  }

  _createYAxis(graph) {
    return new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'right',
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: this.ui.yAxis[0]  
    });
  }

  _setHoverDetails(graph) {
    new Rickshaw.Graph.HoverDetail({
      graph: graph
    });
  }

  _updateGraphRealtime(graph, data) {
    var random = new Rickshaw.Fixtures.RandomData(100);

    window.setInterval(function() {
      random.removeData(data);
      random.addData(data);
      graph.update();
    }, 1000);    
  }

  _resizeGraphOnPanelChange(graph, region) {
    $('#main-container').on('mouseup', function() {
      graph.configure({
        width: region.$el.width(),
        height: region.$el.height()-80
      });

      graph.render();
    });

    $('#main-container').on('mousemove', function() {
      graph.configure({
        width: region.$el.width(),
        height: region.$el.height()-80
      });

      graph.render();
    });  
  }
}