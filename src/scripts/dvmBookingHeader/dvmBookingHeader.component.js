(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dvmBooking.components:dvmBookingHeader
   * @description
   *
   */

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
