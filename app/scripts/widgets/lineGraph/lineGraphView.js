import 'nvd3/nv.d3.css';
import 'nvd3';
import Marionette from 'backbone.marionette';
import lineGraphTemplate from 'widgets/lineGraph/templates/lineGraph';
import MockData from 'widgets/lineGraph/mockData';

export default class LineGraphView extends Marionette.ItemView {
  constructor(...rest) {
    this.template = lineGraphTemplate;
    this.ui = { 'graph': '.line-graph svg' };
    
    super(...rest);
  }
  
  onShow() {
    // TODO: getting mocked data to show the graph until the 
    // server implements this functionality
    nv.addGraph(this._createGraph(MockData));
  }

  _createGraph(data) {
    var graph = nv.models.cumulativeLineChart()
      .x(function(d) { return d[0]; })
      .y(function(d) { return d[1] / 100; })
      .color(d3.scale.category10().range())
      .useInteractiveGuideline(true);

    graph.xAxis
      .tickFormat(function(d) {
        return d3.time.format('%a')(new Date(d));
      });

    graph.yAxis.tickFormat(d3.format(',.1%'));

    d3.select(this.ui.graph.selector)
      .datum(data)
      .transition().duration(500)
      .call(graph);  
  }
}