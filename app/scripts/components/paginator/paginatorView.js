import Marionette from 'backbone.marionette';
import paginatorTemplate from 'components/paginator/templates/paginator';

export default class PaginatorView extends Marionette.ItemView {
  constructor(...rest) {
    super(...rest);
    this.className = 'btn-group';
    this.events = { 'click a:not(.disabled)': '_movePaginator' };
    this.template = paginatorTemplate;
  }

  initialize(options) {
    this.firstPage = options.firstPage;
    this.lastPage = options.lastPage;
    this.currentPage = options.currentPage;
    this.totalPages = options.totalPages;
  }

  serializeData() {
    let data = { pages: [] };

    for(let i = this.firstPage; i <= this.lastPage; i++) {
      data.pages.push({ pageNumber: i });
    }

    return data;
  }

  onRender() {
    this.$('a[data-page=' + this.currentPage + ']').addClass('active');

    if(this.currentPage === 1) {
      this.$('a[data-page="first"], a[data-page="previous"]')
        .addClass('disabled');
    }

    if(this.currentPage === this.totalPages) {
      this.$('a[data-page="last"], a[data-page="next"]').addClass('disabled');
    }
  }

  updatePaginator(firstPage, lastPage, currentPage, totalPages) {
    if (firstPage) this.firstPage = firstPage; // jshint ignore:line
    if (lastPage) this.lastPage = lastPage; // jshint ignore:line
    if (currentPage) this.currentPage = currentPage; // jshint ignore:line
    if (totalPages) this.totalPages = totalPages; // jshint ignore:line

    this.render();
  }

  _movePaginator(event) {
    event.preventDefault();
    this.trigger('move:paginator', $(event.currentTarget).data('page'));
  }
}
