(function($) {
  'use strict';

  var Pages = function() {
    this.VERSION = "1.0.0";
    this.AUTHOR = "Revox";
    this.SUPPORT = "support@revox.io";
    this.pageScrollElement = 'html, body';
    this.$body = $('body');
    this.setUserOS();
    this.setUserAgent();
  }

  // Set environment vars
  Pages.prototype.setUserOS = function() {
    var OSName = "";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

    this.$body.addClass(OSName);
  }

  Pages.prototype.setUserAgent = function() {
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      this.$body.addClass('mobile');
    } else {
      this.$body.addClass('desktop');
      if (navigator.userAgent.match(/MSIE 9.0/)) {
        this.$body.addClass('ie9');
      }
    }
  }

  // Pages util functions
  Pages.prototype.isVisibleXs = function() {
    (!$('#pg-visible-xs').length) && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />');
    return $('#pg-visible-xs').is(':visible');
  }

  Pages.prototype.isVisibleSm = function() {
    (!$('#pg-visible-sm').length) && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />');
    return $('#pg-visible-sm').is(':visible');
  }

  Pages.prototype.getUserAgent = function() {
    return $('body').hasClass('mobile') ? "mobile" : "desktop";
  }

  $.Pages = new Pages();
  $.Pages.Constructor = Pages;

})(window.jQuery);

(function($) {
  'use strict';
  // SIDEBAR CLASS DEFINITION
  // ======================

  var Sidebar = function(element, options) {
    this.$element = $(element);
    this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);

    this.bezierEasing = [.05, .74, .27, .99];
    this.cssAnimation = true;
    this.menuClosedCSS;
    this.menuOpenCSS;
    this.css3d = true;
    this.sideBarWidth = 280;
    this.sideBarWidthCondensed = 280 - 70;
    this.$sidebarMenu = this.$element.find('.sidebar-menu');
    this.$pageContainer = $(this.options.pageContainer);
    this.$body = $('body');

    if (!this.$sidebarMenu.length) return;

    // apply perfectScrollbar plugin only for desktops
    ($.Pages.getUserAgent() == 'desktop') && this.$sidebarMenu.mCustomScrollbar();


    if (!Modernizr.csstransitions)
      this.cssAnimation = false;
    if (!Modernizr.csstransforms3d)
      this.css3d = false;

    this.menuOpenCSS = (this.css3d == true ? 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)' : 'translate(' + this.sideBarWidthCondensed + 'px, 0)');
    this.menuClosedCSS = (this.css3d == true ? 'translate3d(0, 0,0)' : 'translate(0, 0)');


    // Bind events
    // Toggle sub menus
    this.$sidebarMenu.find('li > a').on('click', function(e) {

      if ($(this).parent().children('.sub-menu') === false) {
        return;
      }

      var parent = $(this).parent().parent();
      var tempElem = $(this).parent();

      parent.children('li.open').children('a').children('.arrow').removeClass('open');
      parent.children('li.open').children('a').children('.arrow').removeClass('active');
      parent.children('li.open').children('.sub-menu').slideUp(200, function() {

      });
      parent.children('li').removeClass('open');
      var sub = $(this).parent().children('.sub-menu');
      if (sub.is(":visible")) {
        $('.arrow', $(this)).removeClass("open");

        sub.slideUp(200, function() {
          $(this).parent().removeClass("active");
        });
      } else {
        $('.arrow', $(this)).addClass("open");
        $(this).parent().addClass("open");
        sub.slideDown(200, function() {});
      }
    });

    // Toggle sidebar
    $('.sidebar-slide-toggle').on('click touchend', function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      var el = $(this).attr('data-pages-toggle');
      if (el != null) {
        $(el).toggleClass('show');
      }
    });

    var _this = this;

    function sidebarMouseEnter(e) {
      if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
        return false
      }
      if ($('.close-sidebar').data('clicked')) {
        return;
      }
      if (_this.$body.hasClass('menu-pin'))
        return;
      if (_this.cssAnimation) {
        _this.$element.css({
          'transform': _this.menuOpenCSS
        });
        _this.$body.addClass('sidebar-visible');
      } else {
        _this.$element.stop().animate({
          left: '0px'
        }, 400, $.bez(_this.bezierEasing), function() {
          _this.$body.addClass('sidebar-visible');
        });
      }
    }

    function sidebarMouseLeave(e) {
      if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
        return false;
      }
      if (typeof e != 'undefined') {
        var target = $(e.target);
        if (target.parent('.page-sidebar').length) {
          return;
        }
      }
      if (_this.$body.hasClass('menu-pin'))
        return;

      if ($('.sidebar-overlay-slide').hasClass('show')) {
        $('.sidebar-overlay-slide').removeClass('show')
        $("[data-pages-toggle']").removeClass('active')
      }

      if (_this.cssAnimation) {
        _this.$element.css({
          'transform': _this.menuClosedCSS
        });
        _this.$body.removeClass('sidebar-visible');
      } else {
        _this.$element.stop().animate({
          left: '-' + _this.sideBarWidthCondensed + 'px'
        }, 400, $.bez(_this.bezierEasing), function() {

          _this.$body.removeClass('sidebar-visible')
          setTimeout(function() {
            $('.close-sidebar').data({
              clicked: false
            });
          }, 100);
        });
      }
    }

    this.$element.bind('mouseenter', sidebarMouseEnter);
    this.$pageContainer.bind('mouseover', sidebarMouseLeave);
  }

  Sidebar.prototype.togglePinSidebar = function(toggle) {
    if (toggle == 'hide') {
      this.$body.removeClass('menu-pin');
    } else if (toggle == 'show') {
      this.$body.addClass('menu-pin');
    } else {
      this.$body.toggleClass('menu-pin');
    }
  }

  // SIDEBAR PLUGIN DEFINITION
  // =======================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('pg.sidebar');
      var options = typeof option == 'object' && option;

      if (!data) $this.data('pg.sidebar', (data = new Sidebar(this, options)));
      if (typeof option == 'string') data[option]();
    })
  }

  var old = $.fn.sidebar;

  $.fn.sidebar = Plugin;
  $.fn.sidebar.Constructor = Sidebar;
  $.fn.sidebar.defaults = {
    pageContainer: '.page-container'
  }

  // SIDEBAR PROGRESS NO CONFLICT
  // ====================
  $.fn.sidebar.noConflict = function() {
    $.fn.sidebar = old;
    return this;
  }

  // SIDEBAR PROGRESS DATA API
  //===================
  $(window).on('load', function() {
    $('[data-pages="sidebar"]').each(function() {
      var data = $(this).data();
      $(this).sidebar(data);
    })
  })

  $(document).on('click.pg.sidebar.data-api', '[data-toggle-pin="sidebar"]', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $target = $('[data-pages="sidebar"]');
    $target.data('pg.sidebar').togglePinSidebar();
    return false;
  })

})(window.jQuery);

/* ============================================================
 * Pages Notifications
 * ============================================================ */

(function($) {

    'use strict';

    var Notification = function(container, options) {

        var self = this;

        // Element collection
        self.container = $(container); // 'body' recommended
        self.notification = $('<div class="pgn"></div>');
        self.options = $.extend(true, {}, $.fn.pgNotification.defaults, options);

        if (!self.container.find('.pgn-wrapper[data-position=' + this.options.position + ']').length) {
            self.wrapper = $('<div class="pgn-wrapper" data-position="' + this.options.position + '"></div>');
            self.container.append(self.wrapper);
        } else {
            self.wrapper = $('.pgn-wrapper[data-position=' + this.options.position + ']');
        }

        self.alert = $('<div class="alert"></div>');
        self.alert.addClass('alert-' + self.options.type);

        if (self.options.style == 'bar') {
            new BarNotification();
        } else if (self.options.style == 'flip') {
            new FlipNotification();
        } else if (self.options.style == 'circle') {
            new CircleNotification();
        } else if (self.options.style == 'simple') {
            new SimpleNotification();
        } else { // default = 'simple'
            new SimpleNotification();
        }

        // Notification styles
        function SimpleNotification() {

            self.notification.addClass('pgn-simple');

            self.alert.append(self.options.message);
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');

                self.alert.prepend(close);
            }

        }

        function BarNotification() {

            self.notification.addClass('pgn-bar');

            self.alert.append('<span>' + self.options.message + '</span>');
            self.alert.addClass('alert-' + self.options.type);


            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');

                self.alert.prepend(close);
            }

        }

        function CircleNotification() {

            self.notification.addClass('pgn-circle');

            var table = '<div>';
            if (self.options.thumbnail) {
                table += '<div class="pgn-thumbnail"><div>' + self.options.thumbnail + '</div></div>';
            }

            table += '<div class="pgn-message"><div>';

            if (self.options.title) {
                table += '<p class="bold">' + self.options.title + '</p>';
            }
            table += '<p>' + self.options.message + '</p></div></div>';
            table += '</div>';

            if (self.options.showClose) {
                table += '<button type="button" class="close" data-dismiss="alert">';
                table += '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>';
                table += '</button>';
            }


            self.alert.append(table);
            self.alert.after('<div class="clearfix"></div>');

        }

        function FlipNotification() {

            self.notification.addClass('pgn-flip');
            self.alert.append("<span>" + self.options.message + "</span>");
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');

                self.alert.prepend(close);
            }

        }

        self.notification.append(self.alert);

        // bind to Bootstrap closed event for alerts
        self.alert.on('closed.bs.alert', function() {
            self.notification.remove();
            self.options.onClosed();
            // refresh layout after removal
        });

        return this; // enable chaining
    };

    Notification.VERSION = "1.0.0";

    Notification.prototype.show = function() {

        // TODO: add fadeOut animation on show as option
        this.wrapper.prepend(this.notification);

        this.options.onShown();

        if (this.options.timeout != 0) {
            // settimeout removes scope. use .bind(this)
            setTimeout(function() {
                this.notification.fadeOut("slow", function() {
                    $(this).remove();
                    this.options.onClosed();
                });
            }.bind(this), this.options.timeout);
        }

    };

    $.fn.pgNotification = function(options) {
        return new Notification(this, options);
    };

    $.fn.pgNotification.defaults = {
        style: 'simple',
        message: null,
        position: 'top-right',
        type: 'info',
        showClose: true,
        timeout: 4000,
        onShown: function() {},
        onClosed: function() {}
    }
})(window.jQuery);
