import BarGraph from './barGraph/barGraph';
import RealtimeGraph from './realtimeGraph/realtimeGraph';
import AreaGraph from './areaGraph/areaGraph';
import LineGraph from './lineGraph/lineGraph';

var container = {
  'barGraph': BarGraph,
  'realtimeGraph': RealtimeGraph,
  'areaGraph': AreaGraph,
  'lineGraph': LineGraph
};

export default container;