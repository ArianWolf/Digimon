import App from 'app';
import MainRouter from 'router';
import 'apps/users/router';
import 'apps/sources/router';
import 'apps/dashboards/router';

App.router = new MainRouter();

App.start();