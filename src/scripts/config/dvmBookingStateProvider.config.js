(function () {
    'use strict';

    angular.module('dvmBooking').config(function ($stateProvider) {

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
    })
        .run(function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $state.transitionTo('app.home');
        })

})();