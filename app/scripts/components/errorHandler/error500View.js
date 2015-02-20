import ErrorView from './errorView';
import error500Template from 'components/errorHandler/templates/error500';

export default class Error500View extends ErrorView {
  constructor(...rest) {
    this.template = error500Template;
    super(...rest);
  }
}