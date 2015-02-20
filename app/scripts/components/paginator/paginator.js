import Marionette from 'backbone.marionette';
import PaginatorView from './paginatorView';

export default class Paginator extends Marionette.Object {
  initialize(options) {
    this.region = options.region ;
    this.collection = options.collection;
    this.pagesAtView = options.pagesAtView;
    this._calculatePaginatorValues();
  }

  show() {
    this.paginator = new PaginatorView({
      firstPage: this.firstPage,
      lastPage: this.lastPage,
      currentPage: this.collection.state.currentPage || 1,
      totalPages: this.totalPages
    });

    this.listenTo(this.paginator, 'move:paginator', this._movePaginator);
    this.listenTo(this.collection, 'sync', this._updatePaginatorView);

    this.region.show(this.paginator);
  }

  _updatePaginatorView() {
    this._calculatePaginatorValues();
    this.paginator.updatePaginator(this.firstPage, this.lastPage,
      this.currentPage, this.totalPages);
  }

  _calculatePaginatorValues() {
    this.firstPage = 1;
    this.totalPages = this.collection.state.totalPages || 1;
    this.currentPage = this.collection.state.currentPage || 1;

    if (this.totalPages < this.pagesAtView) {
      this.lastPage = this.totalPages;
    } else {
      this.firstPage = this.currentPage - Math.floor(this.pagesAtView / 2);
      this.lastPage = this.currentPage + Math.floor(this.pagesAtView / 2);
    }

    if (this.firstPage <= 0) { this._fixPaginatorUnderflow(); }
    if (this.lastPage > this.totalPages) { this._fixPaginatorOverflow(); }
    if (this.lastPage === 0) { this.lastPage = 1; }
  }

  _fixPaginatorUnderflow() {
    this.firstPage = 1;
    this.lastPage = this.firstPage + this.pagesAtView - 1;
  }

  _fixPaginatorOverflow() {
    this.lastPage = this.totalPages;
    this.firstPage = this.lastPage - this.pagesAtView + 1;
  }

  _movePaginator(page) {
    switch (page) {
      case 'first': return this._fetchFirstPage();
      case 'previous': return this._fetchPreviousPage();
      case 'last': return this._fetchLastPage();
      case 'next': return this._fetchNextPage();
      default: return this._fetchPageByNumber(parseInt(page));
    }
  }

  _fetchFirstPage() {
    this.collection.getFirstPage()
    .then(function() {
      return this._updatePaginatorView();
    })
    .fail(function() {
      return this.trigger('pagination:error');
    });
  }

  _fetchLastPage() {
    this.collection.getLastPage()
    .then(function() {
      return this._updatePaginatorView();
    })
    .fail(function() {
      return this.trigger('pagination:error');
    });
  }

  _fetchPreviousPage() {
    this.collection.getPreviousPage()
    .then(function() {
      return this._updatePaginatorView();
    })
    .fail(function() {
      return this.trigger('pagination:error');
    });
  }

  _fetchNextPage() {
    this.collection.getNextPage()
    .then(function() {
      return this._updatePaginatorView();
    })
    .fail(function() {
      return this.trigger('pagination:error');
    });
  }
}