import 'sweetalert/lib/sweet-alert.css';
import Sweetalert from 'sweetalert';
import App from 'app';
import './dasboardListView';

App.module('Dashboards.List', function(List, App, Backbone, Marionette) {
  'use strict';

  class DashboardList extends Marionette.Object {
    showList(dashboards) {
      var region = this.getOption('region');
      var listView = new List.Views.DashboardListView({
        collection: dashboards 
      });

      this.listenTo(listView, 'childview:remove:item', (child) => {
        this.sweetalertRemove(child);
      });
      
      region.show(listView);
    } 

    sweetalertRemove(child) {
      Sweetalert({
        title: '¿Esta seguro?',
        text: 'Este registro se borrara permanentemente',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, Borrarlo',
        cancelButtonText: 'No, Cancelar',
        closeOnConfirm: false,
        closeOnCancel: false
        }, 
        function(isConfirm) {
          if (isConfirm) {
            Sweetalert('¡Borrado!', 'El registro ha sido borrado.', 'success');
            child.model.destroy();
          } else {
            Sweetalert('¡Cancelado!', 'Su archivo esta a salvo :)', 'error');
        }
      });
    }
  }

  List.DashboardList = DashboardList;
});