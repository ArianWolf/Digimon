import ErrorView from './errorView';
import error401Template from 'components/errorHandler/templates/error401';

export default class Error401View extends ErrorView {
  constructor(...rest) {
    this.template = error401Template;
    super(...rest);
  }
}
