(function () {
    'use strict';
    angular.module(
        'dvmBooking',

        // DEPENDENCIES
        [
            'dvm.templates',
            'ui.router',
            'pascalprecht.translate'
        ]);
}());

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dvmBooking.components:dvmBooking
   * @description
   *
   */

  angular.module('dvmBooking').component('dvmBooking', {
        bindings: {
        },
        controller: dvmBookingCtrl,
        controllerAs: 'dvmBookingCtrl',
        templateUrl: 'src/scripts/dvmBooking/dvmBooking.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name dvmBooking.components:dvmBookingCtrl
   * @description
   *
   */
  function dvmBookingCtrl() {

    var self = this;


  }

}());

(function () {
    'use strict';

    angular.module('dvmBooking').config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/{lang:(?:es|en)}',
                params: {lang : {  value: 'en' }}
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'content@': {
                        template: '<dvm-booking-home></dvm-booking-home>'
                    }
                }
            })
            .state('app.hotelList', {
                url: '/hotels',
                views: {
                    'content@': {
                        template: '<dvm-booking-hotel-list></dvm-booking-hotel-list>'
                    }
                }
            })
            .state('app.hotelList.hotel', {
                url: '/:hotelId',

                views: {
                    'content@': {
                        template: '<dvm-booking-hotel></dvm-booking-hotel>'
                    }
                }

            })
    }])
        .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $state.transitionTo('app.home');
        }])

})();
(function () {
    'use strict';

    angular.module('dvmBooking').config(["$translateProvider", function ($translateProvider) {
        $translateProvider.translations('en', {
            'HOME_TITLE': 'Home Page',
            'HOME': 'Home',
            'HOTELS': 'Hotels',
            'HOTEL_LIST': 'Hotel list',
            'DETAILS': 'Details',
            'STARS': 'Stars',
            'COUNTRY': 'Country',
            'CITY': 'City',
            'ADDRESS': 'Address',
            'SPANISH': 'Spanish',
            'ENGLISH': 'English',
            'LANGUAGE': 'Language'


        });

        $translateProvider.translations('es', {
            'HOME_TITLE': 'Pagina de Inicio',
            'HOME': 'Inicio',
            'HOTELS': 'Hoteles',
            'HOTEL_LIST': 'Lista de Hoteles',
            'DETAILS': 'Detalles',
            'STARS': 'Estrellas',
            'COUNTRY': 'Pais',
            'CITY': 'Ciudad',
            'ADDRESS': 'Direccion',
            'SPANISH': 'Español',
            'ENGLISH': 'Ingles',
            'LANGUAGE': 'Idioma'
        });

        $translateProvider.preferredLanguage('en');
    }])

})();
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dvmBooking.components:dvmBookingHeader
   * @description
   *
   */

  dvmBookingHeaderCtrl.$inject = ["$translate", "$scope", "$stateParams", "$state", "$rootScope", "$location"];
  angular.module('dvmBooking').component('dvmBookingHeader', {
        bindings: {
        },
        controller: dvmBookingHeaderCtrl,
        controllerAs: 'dvmBookingHeaderCtrl',
        templateUrl: 'src/scripts/dvmBookingHeader/dvmBookingHeader.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name dvmBooking.components:dvmBookingHeaderCtrl
   * @description
   *
   */
  function dvmBookingHeaderCtrl($translate, $scope, $stateParams, $state, $rootScope, $location) {

    var self = this;

      self.changeLanguage = changeLanguage;

      self.$onInit = $onInit;

      function $onInit(){
          changeLanguage($stateParams.lang);
      }


      function changeLanguage(langId){
          $stateParams.lang = langId;
          var otherLang = $stateParams.lang === 'es' ? 'en' : 'es';
          $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
          $translate.use($stateParams.lang);
          $state.reload();
      }

      $scope.$on('$stateChangeSuccess', rootStateChangeSuccess);

      function rootStateChangeSuccess(){
          if($stateParams.lang !== undefined){
              var otherLang = $stateParams.lang === 'es' ? 'en' : 'es';
              $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
              $translate.use($stateParams.lang);
          }
      }



  }

}());

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dvmBooking.components:dvmBookingHome
   * @description
   *
   */

  angular.module('dvmBooking').component('dvmBookingHome', {
        bindings: {
        },
        controller: dvmBookingHomeCtrl,
        controllerAs: 'dvmBookingHomeCtrl',
        templateUrl: 'src/scripts/dvmBookingHome/dvmBookingHome.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name dvmBooking.components:dvmBookingHomeCtrl
   * @description
   *
   */
  function dvmBookingHomeCtrl() {

    var self = this;






  }

}());

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name dvmBooking.components:dvmBookingHotel
     * @description
     *
     */

    dvmBookingHotelCtrl.$inject = ["$stateParams", "dvmBookingHotelService"];
    angular.module('dvmBooking').component('dvmBookingHotel', {
            bindings: {},
            controller: dvmBookingHotelCtrl,
            controllerAs: 'dvmBookingHotelCtrl',
            templateUrl: 'src/scripts/dvmBookingHotel/dvmBookingHotel.tpl.html'
        }
    );

    /**
     * @ngdoc controller
     * @name dvmBooking.components:dvmBookingHotelCtrl
     * @description
     *
     */
    function dvmBookingHotelCtrl($stateParams, dvmBookingHotelService) {

        var self = this;
        self.hotel = {};
        self.$onInit = $onInit;

        function $onInit() {
            dvmBookingHotelService.getHotelById($stateParams.hotelId).then(function (returnValue) {
                self.hotel = returnValue;
            });
        }


    }

}());

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name dvmBooking.components:dvmBookingHotelList
     * @description
     *
     */

    dvmBookingHotelListCtrl.$inject = ["dvmBookingHotelService"];
    angular.module('dvmBooking').component('dvmBookingHotelList', {
            bindings: {},
            controller: dvmBookingHotelListCtrl,
            controllerAs: 'dvmBookingHotelListCtrl',
            templateUrl: 'src/scripts/dvmBookingHotelList/dvmBookingHotelList.tpl.html'
        }
    );

    /**
     * @ngdoc controller
     * @name dvmBooking.components:dvmBookingHotelListCtrl
     * @description
     *
     */
    function dvmBookingHotelListCtrl(dvmBookingHotelService) {

        var self = this;
        self.hotels = [];
        self.$onInit = $onInit;

        function $onInit() {
            dvmBookingHotelService.getHotels().then(function(data){
                self.hotels = data.data;

            });

        }


    }

}());

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @name dvmBooking.provider:dvmBookingHotelService
     * @description
     *
     */

    angular.module('dvmBooking').provider('dvmBookingHotelService', function () {

        /**
         * @ngdoc service
         * @name dvmBooking.service:dvmBookingHotelService
         * @description
         *
         */
        dvmBookingHotelService.$inject = ["$http", "$q"];
        this.$get = dvmBookingHotelService;


        function dvmBookingHotelService($http, $q) {
            var self = this;
            self.getHotels = getHotels;
            self.getHotelById = getHotelById;

            function getHotels() {
                return $http.get('_data/hotels.json');
            }

            function getHotelById(hotelId) {
                return $q(function (resolve, reject) {
                    $http.get('_data/hotels.json').then(function (data) {
                        angular.forEach(data.data, function (hotel) {
                            if (hotel.id == hotelId) {
                                resolve(hotel)
                            }
                        })
                    })
                });
            }


            return self;
        }
    });


})();
