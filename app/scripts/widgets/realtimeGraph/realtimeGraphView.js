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
    var data = this._getRandomData();

    var graph = this._createGraph(data);
    this._createYAxis(graph);
    this._setHoverDetails(graph);

    this._updateGraphRealtime(graph, data);

    this._resizeGraphOnPanelChange(graph);

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

  _createGraph(data) {
    return new Rickshaw.Graph({
      element: this.ui.graph[0],
      height: $('.panel-body').height(),
      renderer: 'area',
      padding: { top: 0.5 },
      series: [{
        data: data[0],
        color: 'steelblue', 
        name: 'DB Server'
      }, {
        data: data[1],
        color: 'lightblue', 
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

  _resizeGraphOnPanelChange(graph) {
    $('#main-container').on('mouseup', function() {
      graph.configure({
        width: $('.panel-body').width(),
        height: $('.panel-body').height()
      });

      graph.render();
    });

    $('#main-container').on('mousemove', function() {
      graph.configure({
        width: $('.panel-body').width(),
        height: $('.panel-body').height()
      });

      graph.render();
    });  
  }
}