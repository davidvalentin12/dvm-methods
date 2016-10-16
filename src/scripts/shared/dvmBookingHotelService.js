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
