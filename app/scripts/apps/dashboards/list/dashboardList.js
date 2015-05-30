import 'sweetalert/lib/sweet-alert.css';
import Sweetalert from 'sweetalert';
import App from 'app';
import './dasboardListView';

App.module('Dashboards.List', function(List, App, Backbone, Marionette) {
  'use strict';

  class DashboardList extends Marionette.Object {
    constructor(...rest) {
      this.dashboardCollection = null;
      super(...rest);
    }

    showList(dashboards) {
      this.dashboardCollection = dashboards;
      var region = this.getOption('region');
      var listView = new List.Views.DashboardListView({
        collection: dashboards 
      });

      this.listenTo(listView, 'childview:remove:item', (child) => {
        this._sweetalertRemove(child);
      });

      this.listenTo(listView, 'childview:edit:item',(child) => {
        var name = child.model.get('name');
        var description = child.model.get('description');

        var inputName = this._createInput(name, 'inputName');
        this._cleanAndSetInput(child, 'name', inputName);

        var inputDescription = this._createInput(description, 'inputDescription');
        this._cleanAndSetInput(child, 'description', inputDescription);

        this._setDisplayVauleToButtons(child, 'none', 'inline');
      });

      this.listenTo(listView, 'childview:edit:user',(child) => {
        debugger;
        listView.$('#modalSlideLeft').modal('show');
      });


      this.listenTo(listView, 'childview:save:item', (child) => {
        var name = child.$('.inputName').val();
        var description = child.$('.inputDescription').val();

        child.$('.inputName').css('display', 'none');
        child.$('.inputDescription').css('display', 'none');

        child.$('#name').html(name);
        child.$('#description').html(description);

        this._setDisplayVauleToButtons(child, 'inline', 'none');

        child.model.set('name', name);
        child.model.set('description', description);

        this.dashboardCollection.set(child.model ,{remove:false});

      });
      
      region.show(listView);
    } 

    _createInput(value, _class) {
      return $('<input>').val(value).addClass(_class).
        addClass('form-control');
    }

    _cleanAndSetInput(child, _id, input){
      child.$('#' + _id).empty();
      child.$('#' + _id).append(input);
    }

    _setDisplayVauleToButtons(child, edit, save) {
      child.$('.editItem').css('display', edit);
      child.$('.saveItem').css('display', save);
    }



    _sweetalertRemove(child) {
      Sweetalert({
        title: '¿Está seguro?',
        text: 'Este registro se borrará permanentemente',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Sí, Borrarlo',
        cancelButtonText: 'No, Cancelar',
        closeOnConfirm: false,
        closeOnCancel: false
        }, 
        function(isConfirm) {
          if (isConfirm) {
            Sweetalert('¡Borrado!', 'El registro ha sido borrado.', 'success');
            child.model.destroy();
          } else {
            Sweetalert('¡Cancelado!', 'Su registro está a salvo :)', 'error');
        }
      });
    }
  }

  List.DashboardList = DashboardList;
});