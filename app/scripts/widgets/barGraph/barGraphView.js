import 'rickshaw/rickshaw.css';
import Rickshaw from 'rickshaw';
import Marionette from 'backbone.marionette';
import barGraphTemplate from 'widgets/barGraph/templates/barGraph';

export default class BarGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.tagName = 'div';
    this.template = barGraphTemplate;
    this.ui = {
      'graph': '.rickshaw-stacked-bars'
    };

    super(...rest);
  }

  onShow() {
    var data = this._generateRandomData();
    var graph = this._createGraph(data);
    this._configureWidth(graph);
    this._setToolTipHover(graph);

    graph.render();

    this._resizeGraphOnPanelSizeChange(graph);

    $(this.ui.graph).data('chart', graph);
  }

  // TODO: The data is generate randomly, just to show a 
  // test graph
  _generateRandomData() {
    var seriesData = [ [], [] ];
    var random = new Rickshaw.Fixtures.RandomData(40);
    
    for (var i = 0; i < 40; i++) {
      random.addData(seriesData);
    }

    return seriesData;
  }

  _createGraph(data) {
    return new Rickshaw.Graph({
      renderer: 'bar',
      element: this.ui.graph[0],
      height: $('.panel-body').height(),
      padding: { top: 0.5 },
      series: [{
        data: data[0],
        color: 'steelblue',
        name: 'New users'
      },{
        data: data[1],
        color: 'lightblue',
        name: 'Returning users'
      }]
    });
  }

  _configureWidth(graph) {
     graph.configure({
      width: $('.panel-body').width(),
    });
  }

  _setToolTipHover(graph) {
    new Rickshaw.Graph.HoverDetail({
      graph: graph,
      formatter: function(series, x, y) {
        var date = '<span class="date">' + 
          new Date(x * 1000).toUTCString() + '</span>';
        var swatch = '<span class="detail_swatch" style="background-color: ' +
          series.color + '"></span>';
        var content = swatch + series.name + ': ' + parseInt(y) +
          '<br>' + date;
        return content;
      }
    });
  }

  _resizeGraphOnPanelSizeChange(graph) {
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