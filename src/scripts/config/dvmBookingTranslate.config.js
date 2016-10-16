(function () {
    'use strict';

    angular.module('dvmBooking').config(function ($translateProvider) {
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
    })

})();