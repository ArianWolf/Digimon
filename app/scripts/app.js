/* jshint devel:true  */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import AppLayout from 'appLayout';
import Sidebar from 'components/sidebar/sidebar';

var App = new Marionette.Application();

App.startSubApp = function(appName, args) {
  'use strict';

  var currentApp = appName ? App.module(appName) : null;
  if (App.currentApp === currentApp) return; // jshint ignore:line

  // Stop if an app is running
  if (App.currentApp) App.currentApp.stop(); // jshint ignore:line

  // Start SubApp if exists
  if (currentApp) {
    App.currentApp = currentApp;
    App.currentApp.start(args);
  }
};

function setSidebar() {
  'use strict';

  var sidebar = new Sidebar();
  sidebar.show();
}

function setAppLayout() {
  'use strict';
  App.appLayout = new AppLayout({ el: '#app-wrapper' });
  App.listenTo(App.appLayout,'render', setSidebar);
  App.appLayout.render();
}

function startHistory() {
  'use strict';

  if (Backbone.history) {
    Backbone.history.start({ pushState: true });
  }
}

function showNotification(data) {
  'use strict';

  var options = {
    style: 'simple',
    message: data.message,
    timeout: 0
  };

  $('body').pgNotification(options).show();
}

function enableNotifications() {
  'use strict';

  App.channel.comply('show:notification', showNotification);
}

App.on('before:start', function() {
  'use strict';

  $(document).on('click', 'a[href^="/"]:not([data-bypass])', function(event) {
    if (!(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)) {
      event.preventDefault();
      var href = $(event.currentTarget).attr('href');
      var url = href.replace(/^\//,'');
      App.router.navigate(url, { trigger: true });
    }
  });
});

App.on('start', function() {
  'use strict';

  setAppLayout();
  startHistory();
  enableNotifications();
});


export default App;
