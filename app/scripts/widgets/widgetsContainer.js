import BarGraph from './barGraph/barGraph';
import RealtimeGraph from './realtimeGraph/realtimeGraph';
import AreaGraph from './areaGraph/areaGraph';
import LineGraph from './lineGraph/lineGraph';

var container = {
  'Grafica de Barras': BarGraph,
  'Grafica de Tiempo Real': RealtimeGraph,
  'Grafica de Area': AreaGraph,
  'Grafica de Lineas': LineGraph
};

export default container;