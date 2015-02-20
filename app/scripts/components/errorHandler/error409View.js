import ErrorView from './errorView';
import error409Template from 'components/errorHandler/templates/error409';

export default class Error409View extends ErrorView {
  constructor(...rest) {
    this.template = error409Template;
    super(...rest);
  }
}
