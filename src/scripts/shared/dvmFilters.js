(function () {
  'use strict';

  angular.module('dvmMethods').factory('dvmFilters', function () {

    var df = this;

    df.timeFilterOptions = [
      {
        value: 0,
        label: 'Todos'
      },
      {
        value: 1,
        label: 'Menos de 1 hora'
      },
      {
        value: 2,
        label: 'De 1 a 3 horas'
      },
      {
        value: 3,
        label: 'De 3 a 10 horas'
      },
      {
        value: 4,
        label: 'De 10 a 24 horas'
      },
      {
        value: 5,
        label: 'Mas de 24 horas'
      }
    ];

    df.potentialTraficFilterOptions = [
      {
        value: 0,
        label: 'Todos'
      },
      {
        value: 1,
        label: 'Poco'
      },
      {
        value: 2,
        label: 'Algo'
      },
      {
        value: 3,
        label: 'Bastante'
      },
      {
        value: 4,
        label: 'Mucho'
      },
      {
        value: 5,
        label: 'Nivel facebook'
      }
    ];

    df.moneyFilterOptions = [
      {
        value: 0,
        label: 'Todos'
      },
      {
        value: 1,
        label: 'Gratis'
      },
      {
        value: 2,
        label: 'Poco'
      },
      {
        value: 3,
        label: 'Medio'
      },
      {
        value: 4,
        label: 'Mucho'
      },
      {
        value: 5,
        label: 'Loco'
      }
    ];

    df.channelFilterOptions = [
      {
        value: 1,
        label: 'Contenidos'
      },
      {
        value: 2,
        label: 'Social Media'
      },
      {
        value: 3,
        label: 'SEO'
      },
      {
        value: 4,
        label: 'Paid Ads'
      },
      {
        value: 5,
        label: 'Web'
      },
      {
        value: 6,
        label: 'Mail Marketing'
      },
      {
        value: 7,
        label: 'Networking'
      },
      {
        value: 8,
        label: 'Concursos'
      }

    ];

    df.bussinesSizeFilterOptions = [
      {
        value: 1,
        label: 'Yo solo'
      },
      {
        value: 2,
        label: 'Pequeña Empresa (1-5 Personas)'
      },
      {
        value: 3,
        label: 'Empresa media (5-10 personas)'
      },
      {
        value: 4,
        label: 'Empresa grande (+10 personas)'
      }
    ];

    return df;
  });

})();