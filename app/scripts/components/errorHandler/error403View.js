import ErrorView from './errorView';
import error403Template from 'components/errorHandler/templates/error403';

export default class Error403View extends ErrorView {
  constructor(...rest) {
    this.template = error403Template;
    super(...rest);
  }
}
