import Marionette from 'backbone.marionette';
import ErrorLayout from './errorLayout';
import Error401View from './error401View';
import Error403View from './error403View';
import Error404View from './error404View';
import Error409View from './error409View';
import Error500View from './error500View';

export default class ErrorHandler extends Marionette.Object{

  handleError(xhr) {
    switch(xhr.status) {
      case 401:
        this._showErrorView(new Error401View());
        break;
      case 403:
        this._showErrorView(new Error403View());
        break;
      case 404:
        this._showErrorView(new Error404View());
        break;
      case 409:
        this._showErrorView(new Error409View());
        break;
      case 500:
        this._showErrorView(new Error500View());
        break;
    }
  }

  _showErrorView(view) {
    var errorLayout = new ErrorLayout({ el: 'body' });

    errorLayout.render();
    errorLayout.getRegion('errorMessage').show(view);
  }
}