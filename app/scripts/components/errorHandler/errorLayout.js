import Marionette from 'backbone.marionette';
import errorLayoutTemplate from 'components/errorHandler/templates/errorLayout';

export default class ErrorLayout extends Marionette.LayoutView {
  constructor(...rest) {
    this.template = errorLayoutTemplate;
    this.regions = { errorMessage: '#error-message' };
    super(...rest);
  }

}