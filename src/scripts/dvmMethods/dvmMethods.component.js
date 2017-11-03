(function () {
  'use strict';

  angular.module('dvmMethods').component('dvmMethods', {
      bindings: {
        methods: '<'
      },
      controller: dvmMethodsCtrl,
      controllerAs: 'dmc',
      templateUrl: 'src/scripts/dvmMethods/dvmMethods.tpl.html'
    }
  );

  function dvmMethodsCtrl(dvmFilters) {
    var dmc = this;

    dmc.getValue = getValue;
    dmc.filterByBussines = filterByBussines;
    dmc.filterByChannel = filterByChannel;
    dmc.getChannels = getChannels;
    dmc.getBussines = getBussines;

    dmc.timeFilterOptions = {
      value: 0,
      options: {
        floor: 0,
        ceil: dvmFilters.timeFilterOptions.length - 1,
        step: 1,
        translate: function (value) {
          dmc.timeFilterOptions.filterValue = value ? value : undefined;
          return getValue('timeFilterOptions', value)
        }
      }
    };

    dmc.moneyFilterOptions = {
      value: 0,
      options: {
        floor: 0,
        ceil: dvmFilters.moneyFilterOptions.length - 1,
        step: 1,
        translate: function (value) {
          dmc.moneyFilterOptions.filterValue = value ? value : undefined;
          return getValue('moneyFilterOptions', value)
        }
      }
    };

    dmc.potentialTraficFilterOptions = {
      value: 0,
      options: {
        floor: 0,
        ceil: dvmFilters.potentialTraficFilterOptions.length - 1,
        step: 1,
        translate: function (value) {
          dmc.potentialTraficFilterOptions.filterValue = value ? value : undefined;
          return getValue('potentialTraficFilterOptions', value)
        }
      }
    };

    dmc.channelFilterOptions = {
      value: [],
      options: dvmFilters.channelFilterOptions,
      texts: {
        buttonDefaultText: '¿Cual es tu canal favorito?',
        checkAll: 'Seleccionar todos',
        uncheckAll: 'Deseleccionar todos',
        dynamicButtonTextSuffix: 'seleccionado/s'
      }
    };

    dmc.bussinesSizeFilterOptions = {
      value: [],
      options: dvmFilters.bussinesSizeFilterOptions,
      texts: {
        buttonDefaultText: '¿Cómo de grande es tu empresa?',
        checkAll: 'Seleccionar todos',
        uncheckAll: 'Deseleccionar todos',
        dynamicButtonTextSuffix: 'seleccionado/s'
      },
      settings: {
        selectionLimit: 1
      }
    };

    function getBussines(bussinesValue){
      var bussinesName = undefined;
      dvmFilters.bussinesSizeFilterOptions.forEach(function(bussines){
        if(bussines.value === bussinesValue){
          bussinesName = bussines.label;
        }
      });
      return bussinesName;
    }

    function getChannels(channelValues) {
      var channelString = '';
      channelValues.forEach(function (value) {
        var channelName = getChannel(value);
        if (channelString == '') {
          channelString = channelName;
        } else {
          channelString = channelString + ' / ' + channelName;
        }
      });

      return channelString;

      function getChannel(value) {
        var channelName = undefined;
        dvmFilters.channelFilterOptions.forEach(function (channel) {
          if (channel.value == value) {
            channelName = channel.label;
          }
        });

        return channelName;
      }
    }

    function getValue(filterType, value) {
      var result = 'ERROR';
      dvmFilters[filterType].forEach(function (type) {
        if (type.value === value) {
          result = type.label;
        }
      });
      return result;
    }

    function filterByBussines(value) {
      var valid = true;
      if (dmc.bussinesSizeFilterOptions.value.length > 0) {
        var anyEqual = false;
        if (value.categories.bussinesSize === dmc.bussinesSizeFilterOptions.value[0].value) {
          anyEqual = true;
        }
        valid = anyEqual;
      }

      return valid;
    }

    function filterByChannel(value) {
      var valid = true;

      if (dmc.channelFilterOptions.value.length > 0) {
        var anyEqual = false;
        dmc.channelFilterOptions.value.forEach(function (category) {
          if (value.categories.channels.indexOf(category.value) !== -1) {
            anyEqual = true;
          }
        });

        valid = anyEqual;
      }

      return valid;
    };

  }

}());
