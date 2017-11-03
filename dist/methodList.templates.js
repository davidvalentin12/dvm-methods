(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/dvmMethods/dvmMethods.tpl.html',
    '<div class=filters><div class=slide-filters><div class=slide-filter><label>Time:</label><label ng-bind="dmc.getValue(\'timeFilterOptions\', dmc.timeFilterOptions.value)"></label><rzslider rz-slider-model=dmc.timeFilterOptions.value rz-slider-options=dmc.timeFilterOptions.options></rzslider></div><div class=slide-filter><label>Dinero:</label><label ng-bind="dmc.getValue(\'moneyFilterOptions\', dmc.moneyFilterOptions.value)"></label><rzslider rz-slider-model=dmc.moneyFilterOptions.value rz-slider-options=dmc.moneyFilterOptions.options></rzslider></div><div class=slide-filter><label>Tráfico potencial:</label><label ng-bind="dmc.getValue(\'potentialTraficFilterOptions\', dmc.potentialTraficFilterOptions.value)"></label><rzslider rz-slider-model=dmc.potentialTraficFilterOptions.value rz-slider-options=dmc.potentialTraficFilterOptions.options></rzslider></div></div><div class=select-filters><div class=select-filter><label>Canales:</label><div ng-dropdown-multiselect="" translation-texts=dmc.channelFilterOptions.texts options=dmc.channelFilterOptions.options selected-model=dmc.channelFilterOptions.value></div></div><div class=select-filter><div><label>Los mejores para ti:</label><div ng-dropdown-multiselect="" extra-settings=dmc.bussinesSizeFilterOptions.settings translation-texts=dmc.bussinesSizeFilterOptions.texts options=dmc.bussinesSizeFilterOptions.options selected-model=dmc.bussinesSizeFilterOptions.value></div></div></div></div></div><div class=method ng-repeat="m in dmc.methods |\n' +
    '  filter:{\n' +
    '      categories:{\n' +
    '        time:dmc.timeFilterOptions.filterValue,\n' +
    '        money:dmc.moneyFilterOptions.filterValue,\n' +
    '        trafic:dmc.potentialTraficFilterOptions.filterValue\n' +
    '      }\n' +
    '    } | filter:dmc.filterByChannel | filter:dmc.filterByBussines"><h3># {{m.name}}</h3><div class=method-properties><div class=row><div class="method-property col-lg-6"><strong>Tiempo:</strong> <span ng-class="{\'red-label\':m.categories.time==5, \'orange-label\':m.categories.time==4 || m.categories.time==3, \'green-label\':m.categories.time==1 || m.categories.time==2}" ng-bind="dmc.getValue(\'timeFilterOptions\', m.categories.time)">3h – 24h</span></div><div class="method-property col-lg-6"><strong>Tráfico Potencial:</strong> <span ng-class="{\'red-label\':m.categories.trafic==5, \'orange-label\':m.categories.trafic==4 || m.categories.trafic==3, \'green-label\':m.categories.trafic==1 || m.categories.trafic==2}" ng-bind="dmc.getValue(\'potentialTraficFilterOptions\', m.categories.trafic)">Media</span></div></div><div class=row><div class="method-property col-lg-6"><strong>Dinero: </strong><span ng-class="{\'red-label\':m.categories.money==5, \'orange-label\':m.categories.money==4 || m.categories.money==3, \'green-label\':m.categories.money==1 || m.categories.money==2}" ng-bind="dmc.getValue(\'moneyFilterOptions\', m.categories.money)">Gratis</span></div></div><div class=row><div class="method-property col-lg-6"><strong>Canales: </strong><span ng-bind=dmc.getChannels(m.categories.channels)></span></div><div class="method-property col-lg-6"><strong>Empresa: </strong><span ng-bind=dmc.getBussines(m.categories.bussinesSize)></span></div></div></div><div class=method-content ng-bind-html=m.contenido></div></div>');
}]);
})();
