(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name dvmBooking.components:dvmBookingHotelList
     * @description
     *
     */

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
