import ErrorView from './errorView';
import error404Template from 'components/errorHandler/templates/error404';

export default class Error404View extends ErrorView {
  constructor(...rest) {
    this.template = error404Template;
    super(...rest);
  }
}