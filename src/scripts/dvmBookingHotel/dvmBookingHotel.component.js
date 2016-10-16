(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name dvmBooking.components:dvmBookingHotel
     * @description
     *
     */

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
