(function () {
    'use strict';
    angular.module(
        'dvmMethods',

        // DEPENDENCIES
        [
             'dvm.templates',
          'angularjs-dropdown-multiselect',
          'rzModule',
          'ngSanitize'
        ]);
}());

(function () {
  'use strict';

  dvmMethodsCtrl.$inject = ["dvmFilters"];
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
       console.log(dmc.bussinesSizeFilterOptions.value[0]);
      if (dmc.bussinesSizeFilterOptions.value.length > 0) {
        var anyEqual = false;
        console.log(value.categories.bussinesSize , dmc.bussinesSizeFilterOptions.value[0].value);
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
/******/!function(e){function t(l){if(n[l])return n[l].exports;var o=n[l]={exports:{},id:l,loaded:!1};return e[l].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}// webpackBootstrap
  /******/
  var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),s=l(o);angular.module("angularjs-dropdown-multiselect",[]).directive("dmDropdownStaticInclude",["$compile",function(e){"ngInject";return function(t,n,l){var o=l.dmDropdownStaticInclude,s=n.html(o).contents();e(s)(t)}}]).directive("ngDropdownMultiselect",s["default"])},function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function o(){return{restrict:"AE",scope:{selectedModel:"=",options:"=",extraSettings:"=",events:"=",searchFilter:"=?",translationTexts:"=",disabled:"="},transclude:{toggleDropdown:"?toggleDropdown"},controller:i["default"],templateUrl:"app/component/angularjs-dropdown-multiselect.html"}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var s=n(2),i=l(s)},function(e,t){"use strict";
  o.$inject = ["e", "t", "o", "s"];function n(e,t){var n=!1;return e.some(function(e){return e===t?(n=!0,!0):!1}),n}function l(e,t,n){var l=-1;return e.some(function(e,o){return e[n]===t[n]?(l=o,!0):!1}),l}function o(e,t,o,s){"ngInject";function i(){setTimeout(function(){var e=angular.element(t)[0].querySelector(".option");angular.isDefined(e)&&null!=e&&e.focus()},0)}function r(){e.open?e.close():e.open=!0,e.settings.keyboardControls&&e.open&&(1===e.settings.selectionLimit&&e.settings.enableSearch?setTimeout(function(){angular.element(t)[0].querySelector(".searchField").focus()},0):i()),e.settings.enableSearch&&e.open&&setTimeout(function(){angular.element(t)[0].querySelector(".searchField").focus()},0)}function c(t,n){e.setSelectedItem(n,!1,!0),t.stopImmediatePropagation()}function a(){e.open=!1,e.input.searchFilter=e.settings.clearSearchOnClose?"":e.input.searchFilter,e.externalEvents.onClose()}function d(t){e.selectedModel.splice(0,e.selectedModel.length),e.options.forEach(function(n){n[e.settings.groupBy]===t&&e.setSelectedItem(n,!1,!1)}),e.externalEvents.onSelectionChanged()}function u(t){return null!==e.settings.groupByTextProvider?e.settings.groupByTextProvider(t):t}function g(e){var n=t.find("button"),l=document.createElement("canvas"),o=l.getContext("2d");return o.font=n.css("font-size")+n.css("font-family"),o.originalFont=n.css("font-size")+n.css("font-family"),o.fillStyle="#000000",o.measureText(e).width}function p(){if(e.settings.dynamicTitle&&e.selectedModel&&e.selectedModel.length>0){if(angular.isFunction(e.settings.smartButtonTextProvider))return e.settings.smartButtonTextProvider(e.selectedModel);if(e.settings.smartButtonMaxItems>0){var n=24,l=2,o=8,s=t[0].offsetWidth-n-l-o,i=[];angular.forEach(e.options,function(t){if(e.isChecked(t)){var n=e.getPropertyForObject(t,e.settings.displayProp),l=e.settings.smartButtonTextConverter(n,t);i.push(l||n)}}),e.selectedModel.length>e.settings.smartButtonMaxItems&&(i=i.slice(0,e.settings.smartButtonMaxItems),i.push("..."));var r=i.join(", "),c=r.length-4;if(0===t[0].offsetWidth)return r;if(s<=g("..."))return"...";for(;g(r)>s;)"..."!==i[i.length-1]&&(i.push("..."),r+="...",c=r.length-4),r=r.slice(0,c)+r.slice(c+1),c-=1;return r}var a=angular.isDefined(e.selectedModel)?e.selectedModel.length:0;return 0===a?e.texts.buttonDefaultText:e.settings.showAllSelectedText&&a===e.options.length?e.texts.allSelectedText:a+" "+e.texts.dynamicButtonTextSuffix}return e.texts.buttonDefaultText}function h(e,t){return angular.isDefined(e)&&Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function f(){e.deselectAll(!0),e.externalEvents.onSelectAll();var t=o("filter")(e.options,e.getFilter(e.input.searchFilter));angular.forEach(t,function(t){e.setSelectedItem(t,!0,!1)}),e.externalEvents.onSelectionChanged(),e.selectedGroup=null}function m(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!1;t||e.externalEvents.onDeselectAll(),e.selectedModel.splice(0,e.selectedModel.length),t||e.externalEvents.onSelectionChanged(),e.selectedGroup=null}function y(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:!1,o=arguments[2],s=void 0,i=void 0;angular.isDefined(A.idProperty)?(s=-1!==l(e.selectedModel,t,A.idProperty),i=l(e.selectedModel,t,A.idProperty)):(s=-1!==e.selectedModel.indexOf(t),i=e.selectedModel.indexOf(t)),!n&&s?(e.selectedModel.splice(i,1),e.externalEvents.onItemDeselect(t),e.settings.closeOnDeselect&&e.close()):!s&&(0===e.settings.selectionLimit||e.selectedModel.length<e.settings.selectionLimit)?(e.selectedModel.push(t),o&&e.externalEvents.onItemSelect(t),e.settings.closeOnSelect&&e.close(),e.settings.selectionLimit>0&&e.selectedModel.length===e.settings.selectionLimit&&e.externalEvents.onMaxSelectionReached()):1!==e.settings.selectionLimit||s||e.selectedModel.length!==e.settings.selectionLimit||(e.selectedModel.splice(0,1),e.selectedModel.push(t),o&&e.externalEvents.onItemSelect(t),e.settings.closeOnSelect&&e.close()),o&&e.externalEvents.onSelectionChanged(),e.selectedGroup=null}function v(t){return angular.isDefined(A.idProperty)?-1!==l(e.selectedModel,t,A.idProperty):-1!==e.selectedModel.indexOf(t)}function k(t){var n=angular.element(t.target).scope(),l=void 0,o=t.target.parentNode;if(e.settings.keyboardControls)if(13===t.keyCode||32===t.keyCode)t.preventDefault(),n.option?e.setSelectedItem(n.option,!1,!0):"deselectAll"===t.target.id?e.deselectAll():"selectAll"===t.target.id&&e.selectAll();else if(38===t.keyCode){for(t.preventDefault(),o.previousElementSibling&&(l=o.previousElementSibling.querySelector("a")||o.previousElementSibling.querySelector("input"));!l&&o;)o=o.previousElementSibling,o&&(l=o.querySelector("a")||o.querySelector("input"));l&&l.focus()}else if(40===t.keyCode){for(t.preventDefault(),o.nextElementSibling&&(l=o.nextElementSibling.querySelector("a")||o.nextElementSibling.querySelector("input"));!l&&o;)o=o.nextElementSibling,o&&(l=o.querySelector("a")||o.querySelector("input"));l&&l.focus()}else 27===t.keyCode&&(t.preventDefault(),e.toggleDropdown())}function b(t){var n=t.target.parentNode.parentNode,l=void 0;if(e.settings.keyboardControls)if(9===t.keyCode||40===t.keyCode)t.preventDefault(),i();else if(38===t.keyCode){for(t.preventDefault(),n.previousElementSibling&&(l=n.previousElementSibling.querySelector("a")||n.previousElementSibling.querySelector("input"));!l&&n;)n=n.previousElementSibling,n&&(l=n.querySelector("a")||n.querySelector("input"));l&&l.focus()}else 27===t.keyCode&&(t.preventDefault(),e.toggleDropdown())}function x(t,n){var l=void 0;e.settings.keyboardControls&&13===t.keyCode&&(1===e.settings.selectionLimit&&e.settings.enableSearch?(l=o("filter")(e.options,e.getFilter(n)),1===l.length&&e.setSelectedItem(l[0],!1,!0)):e.settings.enableSearch&&e.selectAll())}function S(t){var n={};return n[e.settings.searchField]=t,n}function w(t){t&&t.stopPropagation(),e.settings.enableSearch=!e.settings.enableSearch,e.settings.enableSearch||(e.input.searchFilter="")}function C(){e.settings.keyboardControls&&13===event.keyCode&&(e.toggleSearch(),e.settings.enableSearch?setTimeout(function(){angular.element(t)[0].querySelector(".searchField").focus()},0):i())}function D(t,n){if(angular.isUndefined(n))return-1;if(angular.isUndefined(t))return 1;if("object"!==t.type||"object"!==n.type)return t.index<n.index?-1:1;var l=t.value,o=n.value;return e.settings.groupBy&&l[e.settings.groupBy]!==o[e.settings.groupBy]?l[e.settings.groupBy]<o[e.settings.groupBy]?1:-1:e.settings.selectedToTop?!e.isChecked(l)&&!e.isChecked(o)||e.isChecked(l)&&e.isChecked(o)?e.options.indexOf(l)<e.options.indexOf(o)?-1:1:e.isChecked(l)?-1:1:e.options.indexOf(l)<e.options.indexOf(o)?-1:1}var B=t.children()[0],E={onItemSelect:angular.noop,onItemDeselect:angular.noop,onSelectAll:angular.noop,onDeselectAll:angular.noop,onInitDone:angular.noop,onMaxSelectionReached:angular.noop,onSelectionChanged:angular.noop,onClose:angular.noop},A={dynamicTitle:!0,scrollable:!1,scrollableHeight:"300px",closeOnBlur:!0,displayProp:"label",enableSearch:!1,clearSearchOnClose:!1,selectionLimit:0,showCheckAll:!0,showUncheckAll:!0,showEnableSearchButton:!1,closeOnSelect:!1,buttonClasses:"btn btn-default",closeOnDeselect:!1,groupBy:void 0,checkBoxes:!1,groupByTextProvider:null,smartButtonMaxItems:0,smartButtonTextConverter:angular.noop,styleActive:!1,selectedToTop:!1,keyboardControls:!1,template:"{{getPropertyForObject(option, settings.displayProp)}}",searchField:"$",showAllSelectedText:!1},M={checkAll:"Check All",uncheckAll:"Uncheck All",selectionCount:"checked",selectionOf:"/",searchPlaceholder:"Search...",buttonDefaultText:"Select",dynamicButtonTextSuffix:"checked",disableSearch:"Disable search",enableSearch:"Enable search",selectGroup:"Select all:",allSelectedText:"All"},T={searchFilter:e.searchFilter||""};angular.extend(A,e.extraSettings||[]),angular.extend(E,e.events||[]),angular.extend(M,e.translationTexts),A.closeOnBlur&&s.on("click",function(t){if(e.open){for(var l=t.target.parentElement,o=!1;angular.isDefined(l)&&null!==l&&!o;)l.className.split&&n(l.className.split(" "),"multiselect-parent")&&!o&&l===B&&(o=!0),l=l.parentElement;o||e.$apply(function(){e.close()})}}),angular.extend(e,{toggleDropdown:r,checkboxClick:c,externalEvents:E,settings:A,texts:M,input:T,close:a,selectCurrentGroup:d,getGroupLabel:u,getButtonText:p,getPropertyForObject:h,selectAll:f,deselectAll:m,setSelectedItem:y,isChecked:v,keyDownLink:k,keyDownSearchDefault:b,keyDownSearch:x,getFilter:S,toggleSearch:w,keyDownToggleSearch:C,orderFunction:D}),e.externalEvents.onInitDone()}o.$inject=["$scope","$element","$filter","$document"],Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o}]),angular.module("angularjs-dropdown-multiselect").run(["$templateCache",function(e){e.put("app/component/angularjs-dropdown-multiselect.html",'<div class="multiselect-parent btn-group dropdown-multiselect" ng-class="{open: open}"><div ng-transclude=toggleDropdown ng-click=toggleDropdown()><button ng-disabled=disabled type=button class=dropdown-toggle ng-class=settings.buttonClasses>{{getButtonText()}}&nbsp;<span class=caret></span></button></div><ul class="dropdown-menu dropdown-menu-form" ng-if=open ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\', overflow: \'auto\' }"><li ng-if="settings.showCheckAll && settings.selectionLimit === 0"><a ng-keydown=keyDownLink($event) data-ng-click=selectAll() tabindex=-1 id=selectAll><span class="glyphicon glyphicon-ok"></span> {{texts.checkAll}}</a></li><li ng-if=settings.showUncheckAll><a ng-keydown=keyDownLink($event) data-ng-click=deselectAll(); tabindex=-1 id=deselectAll><span class="glyphicon glyphicon-remove"></span> {{texts.uncheckAll}}</a></li><li ng-if="settings.selectByGroups && ((settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll)" class=divider></li><li ng-repeat="currentGroup in settings.selectByGroups track by $index" ng-click=selectCurrentGroup(currentGroup)><a ng-class="{\'dropdown-selected-group\': selectedGroup === currentGroup}" tabindex=-1>{{::texts.selectGroup}} {{::getGroupLabel(currentGroup)}}</a></li><li ng-if="settings.selectByGroups && settings.showEnableSearchButton" class=divider></li><li ng-if="settings.showEnableSearchButton && settings.enableSearch"><a ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click=toggleSearch($event); tabindex=-1>{{texts.disableSearch}}</a></li><li ng-if="settings.showEnableSearchButton && !settings.enableSearch"><a ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click=toggleSearch($event); tabindex=-1>{{texts.enableSearch}}</a></li><li ng-if="(settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll || settings.showEnableSearchButton" class=divider></li><li ng-if=settings.enableSearch><div class=dropdown-header><input type=text class="form-control searchField" ng-keydown="keyDownSearchDefault($event); keyDownSearch($event, input.searchFilter);" ng-style="{width: \'100%\'}" ng-model=input.searchFilter placeholder={{texts.searchPlaceholder}}></div></li><li ng-if=settings.enableSearch class=divider></li><li ng-if=settings.groupBy ng-repeat-start="option in orderedItems = ( options | filter:getFilter(input.searchFilter) | orderBy:\'\':false:orderFunction)" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role=presentation class=dropdown-header>{{ getGroupLabel(getPropertyForObject(option, settings.groupBy)) }}</li><li ng-if=settings.groupBy ng-class="{\'active\': isChecked(option) && settings.styleActive}" ng-repeat-end role=presentation><a ng-keydown="option.disabled || keyDownLink($event)" role=menuitem class=option tabindex=-1 ng-click="option.disabled || setSelectedItem(option, false, true)" ng-disabled=option.disabled><div ng-if=settings.checkBoxes class=checkbox><label><input class=checkboxInput type=checkbox ng-click="checkboxClick($event, option)" ng-checked=isChecked(option)> <span dm-dropdown-static-include={{settings.template}}></span></label></div><span ng-if=!settings.checkBoxes data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(option)}"></span> <span dm-dropdown-static-include={{settings.template}}></span></a></li><li ng-if=!settings.groupBy ng-class="{\'active\': isChecked(option) && settings.styleActive}" role=presentation ng-repeat="option in options | filter:getFilter(input.searchFilter) | orderBy:\'\':false:orderFunction"><a ng-keydown="option.disabled || keyDownLink($event)" role=menuitem class=option tabindex=-1 ng-click="option.disabled || setSelectedItem(option, false, true)" ng-disabled=option.disabled><div ng-if=settings.checkBoxes class=checkbox><label><input class=checkboxInput type=checkbox ng-click="checkboxClick($event, option)" ng-checked=isChecked(option)> <span dm-dropdown-static-include={{settings.template}}></span></label></div><span ng-if=!settings.checkBoxes data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(option)}"></span> <span ng-if=!settings.checkBoxes dm-dropdown-static-include={{settings.template}}></span></a></li><li class=divider ng-show="settings.selectionLimit > 1"></li><li role=presentation ng-show="settings.selectionLimit > 1"><a role=menuitem>{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li></ul></div>')}]);
//# sourceMappingURL=maps/angularjs-dropdown-multiselect.min.js.map

/*! angularjs-slider - v6.4.0 -  (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> -  https://github.com/angular-slider/angularjs-slider -  2017-10-25 */
!function(a,b){"use strict";if("function"==typeof define&&define.amd)define(["angular"],b);else if("object"==typeof module&&module.exports){var c=angular||require("angular");c&&c.module||"undefined"==typeof angular||(c=angular),module.exports=b(c)}else b(a.angular)}(this,function(a){"use strict";var b=a.module("rzModule",[]).factory("RzSliderOptions",function(){var b={floor:0,ceil:null,step:1,precision:0,minRange:null,maxRange:null,pushRange:!1,minLimit:null,maxLimit:null,id:null,translate:null,getLegend:null,stepsArray:null,bindIndexForStepsArray:!1,draggableRange:!1,draggableRangeOnly:!1,showSelectionBar:!1,showSelectionBarEnd:!1,showSelectionBarFromValue:null,showOuterSelectionBars:!1,hidePointerLabels:!1,hideLimitLabels:!1,autoHideLimitLabels:!0,readOnly:!1,disabled:!1,interval:350,showTicks:!1,showTicksValues:!1,ticksArray:null,ticksTooltip:null,ticksValuesTooltip:null,vertical:!1,getSelectionBarColor:null,getTickColor:null,getPointerColor:null,keyboardSupport:!0,scale:1,enforceStep:!0,enforceRange:!1,noSwitching:!1,onlyBindHandles:!1,onStart:null,onChange:null,onEnd:null,rightToLeft:!1,reversedControls:!1,boundPointerLabels:!0,mergeRangeLabelsIfSame:!1,customTemplateScope:null,logScale:!1,customValueToPosition:null,customPositionToValue:null,selectionBarGradient:null,ariaLabel:null,ariaLabelledBy:null,ariaLabelHigh:null,ariaLabelledByHigh:null},c={},d={};return d.options=function(b){a.extend(c,b)},d.getOptions=function(d){return a.extend({},b,c,d)},d}).factory("rzThrottle",["$timeout",function(a){return function(b,c,d){var e,f,g,h=Date.now||function(){return(new Date).getTime()},i=null,j=0;d=d||{};var k=function(){j=h(),i=null,g=b.apply(e,f),e=f=null};return function(){var l=h(),m=c-(l-j);return e=this,f=arguments,0>=m?(a.cancel(i),i=null,j=l,g=b.apply(e,f),e=f=null):i||d.trailing===!1||(i=a(k,m)),g}}}]).factory("RzSlider",["$timeout","$document","$window","$compile","RzSliderOptions","rzThrottle",function(b,c,d,e,f,g){var h=function(a,b){this.scope=a,this.lowValue=0,this.highValue=0,this.sliderElem=b,this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.dragging={active:!1,value:0,difference:0,position:0,lowLimit:0,highLimit:0},this.positionProperty="left",this.dimensionProperty="width",this.handleHalfDim=0,this.maxPos=0,this.precision=0,this.step=1,this.tracking="",this.minValue=0,this.maxValue=0,this.valueRange=0,this.intermediateTicks=!1,this.initHasRun=!1,this.firstKeyDown=!1,this.internalChange=!1,this.cmbLabelShown=!1,this.currentFocusElement=null,this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.ticks=null,this.init()};return h.prototype={init:function(){var b,c,e=this,f=function(){e.calcViewDimensions()};this.applyOptions(),this.syncLowValue(),this.range&&this.syncHighValue(),this.initElemHandles(),this.manageElementsStyle(),this.setDisabledState(),this.calcViewDimensions(),this.setMinAndMax(),this.addAccessibility(),this.updateCeilLab(),this.updateFloorLab(),this.initHandles(),this.manageEventsBindings(),this.scope.$on("reCalcViewDimensions",f),a.element(d).on("resize",f),this.initHasRun=!0,b=g(function(){e.onLowHandleChange()},e.options.interval),c=g(function(){e.onHighHandleChange()},e.options.interval),this.scope.$on("rzSliderForceRender",function(){e.resetLabelsValue(),b(),e.range&&c(),e.resetSlider()}),this.scope.$watch("rzSliderOptions()",function(a,b){a!==b&&(e.applyOptions(),e.syncLowValue(),e.range&&e.syncHighValue(),e.resetSlider())},!0),this.scope.$watch("rzSliderModel",function(a,c){e.internalChange||a!==c&&b()}),this.scope.$watch("rzSliderHigh",function(a,b){e.internalChange||a!==b&&(null!=a&&c(),(e.range&&null==a||!e.range&&null!=a)&&(e.applyOptions(),e.resetSlider()))}),this.scope.$on("$destroy",function(){e.unbindEvents(),a.element(d).off("resize",f),e.currentFocusElement=null})},findStepIndex:function(b){for(var c=0,d=0;d<this.options.stepsArray.length;d++){var e=this.options.stepsArray[d];if(e===b){c=d;break}if(a.isDate(e)){if(e.getTime()===b.getTime()){c=d;break}}else if(a.isObject(e)&&(a.isDate(e.value)&&e.value.getTime()===b.getTime()||e.value===b)){c=d;break}}return c},syncLowValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.lowValue=this.scope.rzSliderModel:this.lowValue=this.findStepIndex(this.scope.rzSliderModel):this.lowValue=this.scope.rzSliderModel},syncHighValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.highValue=this.scope.rzSliderHigh:this.highValue=this.findStepIndex(this.scope.rzSliderHigh):this.highValue=this.scope.rzSliderHigh},getStepValue:function(b){var c=this.options.stepsArray[b];return a.isDate(c)?c:a.isObject(c)?c.value:c},applyLowValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.scope.rzSliderModel=this.lowValue:this.scope.rzSliderModel=this.getStepValue(this.lowValue):this.scope.rzSliderModel=this.lowValue},applyHighValue:function(){this.options.stepsArray?this.options.bindIndexForStepsArray?this.scope.rzSliderHigh=this.highValue:this.scope.rzSliderHigh=this.getStepValue(this.highValue):this.scope.rzSliderHigh=this.highValue},onLowHandleChange:function(){this.syncLowValue(),this.range&&this.syncHighValue(),this.setMinAndMax(),this.updateLowHandle(this.valueToPosition(this.lowValue)),this.updateSelectionBar(),this.updateTicksScale(),this.updateAriaAttributes(),this.range&&this.updateCmbLabel()},onHighHandleChange:function(){this.syncLowValue(),this.syncHighValue(),this.setMinAndMax(),this.updateHighHandle(this.valueToPosition(this.highValue)),this.updateSelectionBar(),this.updateTicksScale(),this.updateCmbLabel(),this.updateAriaAttributes()},applyOptions:function(){var b;b=this.scope.rzSliderOptions?this.scope.rzSliderOptions():{},this.options=f.getOptions(b),this.options.step<=0&&(this.options.step=1),this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.options.draggableRange=this.range&&this.options.draggableRange,this.options.draggableRangeOnly=this.range&&this.options.draggableRangeOnly,this.options.draggableRangeOnly&&(this.options.draggableRange=!0),this.options.showTicks=this.options.showTicks||this.options.showTicksValues||!!this.options.ticksArray,this.scope.showTicks=this.options.showTicks,(a.isNumber(this.options.showTicks)||this.options.ticksArray)&&(this.intermediateTicks=!0),this.options.showSelectionBar=this.options.showSelectionBar||this.options.showSelectionBarEnd||null!==this.options.showSelectionBarFromValue,this.options.stepsArray?this.parseStepsArray():(this.options.translate?this.customTrFn=this.options.translate:this.customTrFn=function(a){return String(a)},this.getLegend=this.options.getLegend),this.options.vertical&&(this.positionProperty="bottom",this.dimensionProperty="height"),this.options.customTemplateScope&&(this.scope.custom=this.options.customTemplateScope)},parseStepsArray:function(){this.options.floor=0,this.options.ceil=this.options.stepsArray.length-1,this.options.step=1,this.options.translate?this.customTrFn=this.options.translate:this.customTrFn=function(a){return this.options.bindIndexForStepsArray?this.getStepValue(a):a},this.getLegend=function(b){var c=this.options.stepsArray[b];return a.isObject(c)?c.legend:null}},resetSlider:function(){this.manageElementsStyle(),this.addAccessibility(),this.setMinAndMax(),this.updateCeilLab(),this.updateFloorLab(),this.unbindEvents(),this.manageEventsBindings(),this.setDisabledState(),this.calcViewDimensions(),this.refocusPointerIfNeeded()},refocusPointerIfNeeded:function(){this.currentFocusElement&&(this.onPointerFocus(this.currentFocusElement.pointer,this.currentFocusElement.ref),this.focusElement(this.currentFocusElement.pointer))},initElemHandles:function(){a.forEach(this.sliderElem.children(),function(b,c){var d=a.element(b);switch(c){case 0:this.leftOutSelBar=d;break;case 1:this.rightOutSelBar=d;break;case 2:this.fullBar=d;break;case 3:this.selBar=d;break;case 4:this.minH=d;break;case 5:this.maxH=d;break;case 6:this.flrLab=d;break;case 7:this.ceilLab=d;break;case 8:this.minLab=d;break;case 9:this.maxLab=d;break;case 10:this.cmbLab=d;break;case 11:this.ticks=d}},this),this.selBar.rzsp=0,this.minH.rzsp=0,this.maxH.rzsp=0,this.flrLab.rzsp=0,this.ceilLab.rzsp=0,this.minLab.rzsp=0,this.maxLab.rzsp=0,this.cmbLab.rzsp=0},manageElementsStyle:function(){this.range?this.maxH.css("display",""):this.maxH.css("display","none"),this.alwaysHide(this.flrLab,this.options.showTicksValues||this.options.hideLimitLabels),this.alwaysHide(this.ceilLab,this.options.showTicksValues||this.options.hideLimitLabels);var a=this.options.showTicksValues&&!this.intermediateTicks;this.alwaysHide(this.minLab,a||this.options.hidePointerLabels),this.alwaysHide(this.maxLab,a||!this.range||this.options.hidePointerLabels),this.alwaysHide(this.cmbLab,a||!this.range||this.options.hidePointerLabels),this.alwaysHide(this.selBar,!this.range&&!this.options.showSelectionBar),this.alwaysHide(this.leftOutSelBar,!this.range||!this.options.showOuterSelectionBars),this.alwaysHide(this.rightOutSelBar,!this.range||!this.options.showOuterSelectionBars),this.range&&this.options.showOuterSelectionBars&&this.fullBar.addClass("rz-transparent"),this.options.vertical&&this.sliderElem.addClass("rz-vertical"),this.options.draggableRange?this.selBar.addClass("rz-draggable"):this.selBar.removeClass("rz-draggable"),this.intermediateTicks&&this.options.showTicksValues&&this.ticks.addClass("rz-ticks-values-under")},alwaysHide:function(a,b){a.rzAlwaysHide=b,b?this.hideEl(a):this.showEl(a)},manageEventsBindings:function(){this.options.disabled||this.options.readOnly?this.unbindEvents():this.bindEvents()},setDisabledState:function(){this.options.disabled?this.sliderElem.attr("disabled","disabled"):this.sliderElem.attr("disabled",null)},resetLabelsValue:function(){this.minLab.rzsv=void 0,this.maxLab.rzsv=void 0},initHandles:function(){this.updateLowHandle(this.valueToPosition(this.lowValue)),this.range&&this.updateHighHandle(this.valueToPosition(this.highValue)),this.updateSelectionBar(),this.range&&this.updateCmbLabel(),this.updateTicksScale()},translateFn:function(a,b,c,d){d=void 0===d?!0:d;var e="",f=!1,g=b.hasClass("no-label-injection");d?(this.options.stepsArray&&!this.options.bindIndexForStepsArray&&(a=this.getStepValue(a)),e=String(this.customTrFn(a,this.options.id,c))):e=String(a),(void 0===b.rzsv||b.rzsv.length!==e.length||b.rzsv.length>0&&0===b.rzsd)&&(f=!0,b.rzsv=e),g||b.html(e),this.scope[c+"Label"]=e,f&&this.getDimension(b)},setMinAndMax:function(){if(this.step=+this.options.step,this.precision=+this.options.precision,this.minValue=this.options.floor,this.options.logScale&&0===this.minValue)throw Error("Can't use floor=0 with logarithmic scale");this.options.enforceStep&&(this.lowValue=this.roundStep(this.lowValue),this.range&&(this.highValue=this.roundStep(this.highValue))),null!=this.options.ceil?this.maxValue=this.options.ceil:this.maxValue=this.options.ceil=this.range?this.highValue:this.lowValue,this.options.enforceRange&&(this.lowValue=this.sanitizeValue(this.lowValue),this.range&&(this.highValue=this.sanitizeValue(this.highValue))),this.applyLowValue(),this.range&&this.applyHighValue(),this.valueRange=this.maxValue-this.minValue},addAccessibility:function(){this.minH.attr("role","slider"),this.updateAriaAttributes(),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.minH.attr("tabindex",""):this.minH.attr("tabindex","0"),this.options.vertical&&this.minH.attr("aria-orientation","vertical"),this.options.ariaLabel?this.minH.attr("aria-label",this.options.ariaLabel):this.options.ariaLabelledBy&&this.minH.attr("aria-labelledby",this.options.ariaLabelledBy),this.range&&(this.maxH.attr("role","slider"),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.maxH.attr("tabindex",""):this.maxH.attr("tabindex","0"),this.options.vertical&&this.maxH.attr("aria-orientation","vertical"),this.options.ariaLabelHigh?this.maxH.attr("aria-label",this.options.ariaLabelHigh):this.options.ariaLabelledByHigh&&this.maxH.attr("aria-labelledby",this.options.ariaLabelledByHigh))},updateAriaAttributes:function(){this.minH.attr({"aria-valuenow":this.scope.rzSliderModel,"aria-valuetext":this.customTrFn(this.scope.rzSliderModel,this.options.id,"model"),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue}),this.range&&this.maxH.attr({"aria-valuenow":this.scope.rzSliderHigh,"aria-valuetext":this.customTrFn(this.scope.rzSliderHigh,this.options.id,"high"),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue})},calcViewDimensions:function(){var a=this.getDimension(this.minH);if(this.handleHalfDim=a/2,this.barDimension=this.getDimension(this.fullBar),this.maxPos=this.barDimension-a,this.getDimension(this.sliderElem),this.sliderElem.rzsp=this.sliderElem[0].getBoundingClientRect()[this.positionProperty],this.initHasRun){this.updateFloorLab(),this.updateCeilLab(),this.initHandles();var c=this;b(function(){c.updateTicksScale()})}},updateTicksScale:function(){if(this.options.showTicks){var a=this.options.ticksArray||this.getTicksArray(),b=this.options.vertical?"translateY":"translateX",c=this;this.options.rightToLeft&&a.reverse(),this.scope.ticks=a.map(function(a){var d=c.valueToPosition(a);c.options.vertical&&(d=c.maxPos-d);var e=b+"("+Math.round(d)+"px)",f={selected:c.isTickSelected(a),style:{"-webkit-transform":e,"-moz-transform":e,"-o-transform":e,"-ms-transform":e,transform:e}};if(f.selected&&c.options.getSelectionBarColor&&(f.style["background-color"]=c.getSelectionBarColor()),!f.selected&&c.options.getTickColor&&(f.style["background-color"]=c.getTickColor(a)),c.options.ticksTooltip&&(f.tooltip=c.options.ticksTooltip(a),f.tooltipPlacement=c.options.vertical?"right":"top"),(c.options.showTicksValues===!0||a%c.options.showTicksValues===0)&&(f.value=c.getDisplayValue(a,"tick-value"),c.options.ticksValuesTooltip&&(f.valueTooltip=c.options.ticksValuesTooltip(a),f.valueTooltipPlacement=c.options.vertical?"right":"top")),c.getLegend){var g=c.getLegend(a,c.options.id);g&&(f.legend=g)}return f})}},getTicksArray:function(){var a=this.step,b=[];this.intermediateTicks&&(a=this.options.showTicks);for(var c=this.minValue;c<=this.maxValue;c+=a)b.push(c);return b},isTickSelected:function(a){if(!this.range)if(null!==this.options.showSelectionBarFromValue){var b=this.options.showSelectionBarFromValue;if(this.lowValue>b&&a>=b&&a<=this.lowValue)return!0;if(this.lowValue<b&&b>=a&&a>=this.lowValue)return!0}else if(this.options.showSelectionBarEnd){if(a>=this.lowValue)return!0}else if(this.options.showSelectionBar&&a<=this.lowValue)return!0;return this.range&&a>=this.lowValue&&a<=this.highValue?!0:!1},updateFloorLab:function(){this.translateFn(this.minValue,this.flrLab,"floor"),this.getDimension(this.flrLab);var a=this.options.rightToLeft?this.barDimension-this.flrLab.rzsd:0;this.setPosition(this.flrLab,a)},updateCeilLab:function(){this.translateFn(this.maxValue,this.ceilLab,"ceil"),this.getDimension(this.ceilLab);var a=this.options.rightToLeft?0:this.barDimension-this.ceilLab.rzsd;this.setPosition(this.ceilLab,a)},updateHandles:function(a,b){"lowValue"===a?this.updateLowHandle(b):this.updateHighHandle(b),this.updateSelectionBar(),this.updateTicksScale(),this.range&&this.updateCmbLabel()},getHandleLabelPos:function(a,b){var c=this[a].rzsd,d=b-c/2+this.handleHalfDim,e=this.barDimension-c;return this.options.boundPointerLabels?this.options.rightToLeft&&"minLab"===a||!this.options.rightToLeft&&"maxLab"===a?Math.min(d,e):Math.min(Math.max(d,0),e):d},updateLowHandle:function(a){if(this.setPosition(this.minH,a),this.translateFn(this.lowValue,this.minLab,"model"),this.setPosition(this.minLab,this.getHandleLabelPos("minLab",a)),this.options.getPointerColor){var b=this.getPointerColor("min");this.scope.minPointerStyle={backgroundColor:b}}this.options.autoHideLimitLabels&&this.shFloorCeil()},updateHighHandle:function(a){if(this.setPosition(this.maxH,a),this.translateFn(this.highValue,this.maxLab,"high"),this.setPosition(this.maxLab,this.getHandleLabelPos("maxLab",a)),this.options.getPointerColor){var b=this.getPointerColor("max");this.scope.maxPointerStyle={backgroundColor:b}}this.options.autoHideLimitLabels&&this.shFloorCeil()},shFloorCeil:function(){if(!this.options.hidePointerLabels){var a=!1,b=!1,c=this.isLabelBelowFloorLab(this.minLab),d=this.isLabelAboveCeilLab(this.minLab),e=this.isLabelAboveCeilLab(this.maxLab),f=this.isLabelBelowFloorLab(this.cmbLab),g=this.isLabelAboveCeilLab(this.cmbLab);if(c?(a=!0,this.hideEl(this.flrLab)):(a=!1,this.showEl(this.flrLab)),d?(b=!0,this.hideEl(this.ceilLab)):(b=!1,this.showEl(this.ceilLab)),this.range){var h=this.cmbLabelShown?g:e,i=this.cmbLabelShown?f:c;h?this.hideEl(this.ceilLab):b||this.showEl(this.ceilLab),i?this.hideEl(this.flrLab):a||this.showEl(this.flrLab)}}},isLabelBelowFloorLab:function(a){var b=this.options.rightToLeft,c=a.rzsp,d=a.rzsd,e=this.flrLab.rzsp,f=this.flrLab.rzsd;return b?c+d>=e-2:e+f+2>=c},isLabelAboveCeilLab:function(a){var b=this.options.rightToLeft,c=a.rzsp,d=a.rzsd,e=this.ceilLab.rzsp,f=this.ceilLab.rzsd;return b?e+f+2>=c:c+d>=e-2},updateSelectionBar:function(){var a=0,b=0,c=this.options.rightToLeft?!this.options.showSelectionBarEnd:this.options.showSelectionBarEnd,d=this.options.rightToLeft?this.maxH.rzsp+this.handleHalfDim:this.minH.rzsp+this.handleHalfDim;if(this.range)b=Math.abs(this.maxH.rzsp-this.minH.rzsp),a=d;else if(null!==this.options.showSelectionBarFromValue){var e=this.options.showSelectionBarFromValue,f=this.valueToPosition(e),g=this.options.rightToLeft?this.lowValue<=e:this.lowValue>e;g?(b=this.minH.rzsp-f,a=f+this.handleHalfDim):(b=f-this.minH.rzsp,a=this.minH.rzsp+this.handleHalfDim)}else c?(b=Math.abs(this.maxPos-this.minH.rzsp)+this.handleHalfDim,a=this.minH.rzsp+this.handleHalfDim):(b=this.minH.rzsp+this.handleHalfDim,a=0);if(this.setDimension(this.selBar,b),this.setPosition(this.selBar,a),this.range&&this.options.showOuterSelectionBars&&(this.options.rightToLeft?(this.setDimension(this.rightOutSelBar,a),this.setPosition(this.rightOutSelBar,0),this.setDimension(this.leftOutSelBar,this.getDimension(this.fullBar)-(a+b)),this.setPosition(this.leftOutSelBar,a+b)):(this.setDimension(this.leftOutSelBar,a),this.setPosition(this.leftOutSelBar,0),this.setDimension(this.rightOutSelBar,this.getDimension(this.fullBar)-(a+b)),this.setPosition(this.rightOutSelBar,a+b))),this.options.getSelectionBarColor){var h=this.getSelectionBarColor();this.scope.barStyle={backgroundColor:h}}else if(this.options.selectionBarGradient){var i=null!==this.options.showSelectionBarFromValue?this.valueToPosition(this.options.showSelectionBarFromValue):0,j=i-a>0^c,k=this.options.vertical?j?"bottom":"top":j?"left":"right";this.scope.barStyle={backgroundImage:"linear-gradient(to "+k+", "+this.options.selectionBarGradient.from+" 0%,"+this.options.selectionBarGradient.to+" 100%)"},this.options.vertical?(this.scope.barStyle.backgroundPosition="center "+(i+b+a+(j?-this.handleHalfDim:0))+"px",this.scope.barStyle.backgroundSize="100% "+(this.barDimension-this.handleHalfDim)+"px"):(this.scope.barStyle.backgroundPosition=i-a+(j?this.handleHalfDim:0)+"px center",this.scope.barStyle.backgroundSize=this.barDimension-this.handleHalfDim+"px 100%")}},getSelectionBarColor:function(){return this.range?this.options.getSelectionBarColor(this.scope.rzSliderModel,this.scope.rzSliderHigh):this.options.getSelectionBarColor(this.scope.rzSliderModel)},getPointerColor:function(a){return"max"===a?this.options.getPointerColor(this.scope.rzSliderHigh,a):this.options.getPointerColor(this.scope.rzSliderModel,a)},getTickColor:function(a){return this.options.getTickColor(a)},updateCmbLabel:function(){var a=null;if(a=this.options.rightToLeft?this.minLab.rzsp-this.minLab.rzsd-10<=this.maxLab.rzsp:this.minLab.rzsp+this.minLab.rzsd+10>=this.maxLab.rzsp){var b=this.getDisplayValue(this.lowValue,"model"),c=this.getDisplayValue(this.highValue,"high"),d="";d=this.options.mergeRangeLabelsIfSame&&b===c?b:this.options.rightToLeft?c+" - "+b:b+" - "+c,this.translateFn(d,this.cmbLab,"cmb",!1);var e=this.options.boundPointerLabels?Math.min(Math.max(this.selBar.rzsp+this.selBar.rzsd/2-this.cmbLab.rzsd/2,0),this.barDimension-this.cmbLab.rzsd):this.selBar.rzsp+this.selBar.rzsd/2-this.cmbLab.rzsd/2;this.setPosition(this.cmbLab,e),this.cmbLabelShown=!0,this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)}else this.cmbLabelShown=!1,this.updateHighHandle(this.valueToPosition(this.highValue)),this.updateLowHandle(this.valueToPosition(this.lowValue)),this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab);this.options.autoHideLimitLabels&&this.shFloorCeil()},getDisplayValue:function(a,b){return this.options.stepsArray&&!this.options.bindIndexForStepsArray&&(a=this.getStepValue(a)),this.customTrFn(a,this.options.id,b)},roundStep:function(a,b){var c=b?b:this.step,d=parseFloat((a-this.minValue)/c).toPrecision(12);d=Math.round(+d)*c;var e=(this.minValue+d).toFixed(this.precision);return+e},hideEl:function(a){return a.css({visibility:"hidden"})},showEl:function(a){return a.rzAlwaysHide?a:a.css({visibility:"visible"})},setPosition:function(a,b){a.rzsp=b;var c={};return c[this.positionProperty]=Math.round(b)+"px",a.css(c),b},getDimension:function(a){var b=a[0].getBoundingClientRect();return this.options.vertical?a.rzsd=(b.bottom-b.top)*this.options.scale:a.rzsd=(b.right-b.left)*this.options.scale,a.rzsd},setDimension:function(a,b){a.rzsd=b;var c={};return c[this.dimensionProperty]=Math.round(b)+"px",a.css(c),b},sanitizeValue:function(a){return Math.min(Math.max(a,this.minValue),this.maxValue)},valueToPosition:function(a){var b=this.linearValueToPosition;this.options.customValueToPosition?b=this.options.customValueToPosition:this.options.logScale&&(b=this.logValueToPosition),a=this.sanitizeValue(a);var c=b(a,this.minValue,this.maxValue)||0;return this.options.rightToLeft&&(c=1-c),c*this.maxPos},linearValueToPosition:function(a,b,c){var d=c-b;return(a-b)/d},logValueToPosition:function(a,b,c){a=Math.log(a),b=Math.log(b),c=Math.log(c);var d=c-b;return(a-b)/d},positionToValue:function(a){var b=a/this.maxPos;this.options.rightToLeft&&(b=1-b);var c=this.linearPositionToValue;return this.options.customPositionToValue?c=this.options.customPositionToValue:this.options.logScale&&(c=this.logPositionToValue),c(b,this.minValue,this.maxValue)||0},linearPositionToValue:function(a,b,c){return a*(c-b)+b},logPositionToValue:function(a,b,c){b=Math.log(b),c=Math.log(c);var d=a*(c-b)+b;return Math.exp(d)},getEventAttr:function(a,b){return void 0===a.originalEvent?a[b]:a.originalEvent[b]},getEventXY:function(a,b){var c=this.options.vertical?"clientY":"clientX";if(void 0!==a[c])return a[c];var d=this.getEventAttr(a,"touches");if(void 0!==b)for(var e=0;e<d.length;e++)if(d[e].identifier===b)return d[e][c];return d[0][c]},getEventPosition:function(a,b){var c=this.sliderElem.rzsp,d=0;return d=this.options.vertical?-this.getEventXY(a,b)+c:this.getEventXY(a,b)-c,d*this.options.scale-this.handleHalfDim},getEventNames:function(a){var b={moveEvent:"",endEvent:""};return this.getEventAttr(a,"touches")?(b.moveEvent="touchmove",b.endEvent="touchend"):(b.moveEvent="mousemove",b.endEvent="mouseup"),b},getNearestHandle:function(a){if(!this.range)return this.minH;var b=this.getEventPosition(a),c=Math.abs(b-this.minH.rzsp),d=Math.abs(b-this.maxH.rzsp);return d>c?this.minH:c>d?this.maxH:this.options.rightToLeft?b>this.minH.rzsp?this.minH:this.maxH:b<this.minH.rzsp?this.minH:this.maxH},focusElement:function(a){var b=0;a[b].focus()},bindEvents:function(){var b,c,d;this.options.draggableRange?(b="rzSliderDrag",c=this.onDragStart,d=this.onDragMove):(b="lowValue",c=this.onStart,d=this.onMove),this.options.onlyBindHandles||(this.selBar.on("mousedown",a.bind(this,c,null,b)),this.selBar.on("mousedown",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("mousedown",a.bind(this,c,null,b)),this.maxH.on("mousedown",a.bind(this,c,null,b))):(this.minH.on("mousedown",a.bind(this,this.onStart,this.minH,"lowValue")),this.range&&this.maxH.on("mousedown",a.bind(this,this.onStart,this.maxH,"highValue")),this.options.onlyBindHandles||(this.fullBar.on("mousedown",a.bind(this,this.onStart,null,null)),this.fullBar.on("mousedown",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("mousedown",a.bind(this,this.onStart,null,null)),this.ticks.on("mousedown",a.bind(this,this.onTickClick,this.ticks)))),this.options.onlyBindHandles||(this.selBar.on("touchstart",a.bind(this,c,null,b)),this.selBar.on("touchstart",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("touchstart",a.bind(this,c,null,b)),this.maxH.on("touchstart",a.bind(this,c,null,b))):(this.minH.on("touchstart",a.bind(this,this.onStart,this.minH,"lowValue")),this.range&&this.maxH.on("touchstart",a.bind(this,this.onStart,this.maxH,"highValue")),this.options.onlyBindHandles||(this.fullBar.on("touchstart",a.bind(this,this.onStart,null,null)),this.fullBar.on("touchstart",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("touchstart",a.bind(this,this.onStart,null,null)),this.ticks.on("touchstart",a.bind(this,this.onTickClick,this.ticks)))),this.options.keyboardSupport&&(this.minH.on("focus",a.bind(this,this.onPointerFocus,this.minH,"lowValue")),this.range&&this.maxH.on("focus",a.bind(this,this.onPointerFocus,this.maxH,"highValue")))},unbindEvents:function(){this.minH.off(),this.maxH.off(),this.fullBar.off(),this.selBar.off(),this.ticks.off()},onStart:function(b,d,e){var f,g,h=this.getEventNames(e);e.stopPropagation(),e.preventDefault(),this.calcViewDimensions(),b?this.tracking=d:(b=this.getNearestHandle(e),this.tracking=b===this.minH?"lowValue":"highValue"),b.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(b),f=a.bind(this,this.dragging.active?this.onDragMove:this.onMove,b),g=a.bind(this,this.onEnd,f),c.on(h.moveEvent,f),c.on(h.endEvent,g),this.endHandlerToBeRemovedOnEnd=g,this.callOnStart();var i=this.getEventAttr(e,"changedTouches");i&&(this.touchId||(this.isDragging=!0,this.touchId=i[0].identifier))},onMove:function(b,c,d){var e,f=this.getEventAttr(c,"changedTouches");if(f)for(var g=0;g<f.length;g++)if(f[g].identifier===this.touchId){e=f[g];break}if(!f||e){var h,i=this.getEventPosition(c,e?e.identifier:void 0),j=this.options.rightToLeft?this.minValue:this.maxValue,k=this.options.rightToLeft?this.maxValue:this.minValue;0>=i?h=k:i>=this.maxPos?h=j:(h=this.positionToValue(i),h=d&&a.isNumber(this.options.showTicks)?this.roundStep(h,this.options.showTicks):this.roundStep(h)),this.positionTrackingHandle(h)}},onEnd:function(a,b){var d=this.getEventAttr(b,"changedTouches");if(!d||d[0].identifier===this.touchId){this.isDragging=!1,this.touchId=null,this.options.keyboardSupport||(this.minH.removeClass("rz-active"),this.maxH.removeClass("rz-active"),this.tracking=""),this.dragging.active=!1;var e=this.getEventNames(b);c.off(e.moveEvent,a),c.off(e.endEvent,this.endHandlerToBeRemovedOnEnd),this.endHandlerToBeRemovedOnEnd=null,this.callOnEnd()}},onTickClick:function(a,b){this.onMove(a,b,!0)},onPointerFocus:function(b,c){this.tracking=c,b.one("blur",a.bind(this,this.onPointerBlur,b)),b.on("keydown",a.bind(this,this.onKeyboardEvent)),b.on("keyup",a.bind(this,this.onKeyUp)),this.firstKeyDown=!0,b.addClass("rz-active"),this.currentFocusElement={pointer:b,ref:c}},onKeyUp:function(){this.firstKeyDown=!0,this.callOnEnd()},onPointerBlur:function(a){a.off("keydown"),a.off("keyup"),a.removeClass("rz-active"),this.isDragging||(this.tracking="",this.currentFocusElement=null)},getKeyActions:function(a){var b=a+this.step,c=a-this.step,d=a+this.valueRange/10,e=a-this.valueRange/10;this.options.reversedControls&&(b=a-this.step,c=a+this.step,d=a-this.valueRange/10,e=a+this.valueRange/10);var f={UP:b,DOWN:c,LEFT:c,RIGHT:b,PAGEUP:d,PAGEDOWN:e,HOME:this.options.reversedControls?this.maxValue:this.minValue,END:this.options.reversedControls?this.minValue:this.maxValue};return this.options.rightToLeft&&(f.LEFT=b,f.RIGHT=c,this.options.vertical&&(f.UP=c,f.DOWN=b)),f},onKeyboardEvent:function(a){var c=this[this.tracking],d=a.keyCode||a.which,e={38:"UP",40:"DOWN",37:"LEFT",39:"RIGHT",33:"PAGEUP",34:"PAGEDOWN",36:"HOME",35:"END"},f=this.getKeyActions(c),g=e[d],h=f[g];if(null!=h&&""!==this.tracking){a.preventDefault(),this.firstKeyDown&&(this.firstKeyDown=!1,this.callOnStart());var i=this;b(function(){var a=i.roundStep(i.sanitizeValue(h));if(i.options.draggableRangeOnly){var b,c,d=i.highValue-i.lowValue;"lowValue"===i.tracking?(b=a,c=a+d,c>i.maxValue&&(c=i.maxValue,b=c-d)):(c=a,b=a-d,b<i.minValue&&(b=i.minValue,c=b+d)),i.positionTrackingBar(b,c)}else i.positionTrackingHandle(a)})}},onDragStart:function(a,b,c){var d=this.getEventPosition(c);this.dragging={active:!0,value:this.positionToValue(d),difference:this.highValue-this.lowValue,lowLimit:this.options.rightToLeft?this.minH.rzsp-d:d-this.minH.rzsp,highLimit:this.options.rightToLeft?d-this.maxH.rzsp:this.maxH.rzsp-d},this.onStart(a,b,c)},getValue:function(a,b,c,d){var e=this.options.rightToLeft,f=null;return f="min"===a?c?d?e?this.minValue:this.maxValue-this.dragging.difference:e?this.maxValue-this.dragging.difference:this.minValue:e?this.positionToValue(b+this.dragging.lowLimit):this.positionToValue(b-this.dragging.lowLimit):c?d?e?this.minValue+this.dragging.difference:this.maxValue:e?this.maxValue:this.minValue+this.dragging.difference:e?this.positionToValue(b+this.dragging.lowLimit)+this.dragging.difference:this.positionToValue(b-this.dragging.lowLimit)+this.dragging.difference,this.roundStep(f)},onDragMove:function(a,b){var c,d,e,f,g,h,i,j,k=this.getEventPosition(b);if(this.options.rightToLeft?(e=this.dragging.lowLimit,f=this.dragging.highLimit,i=this.maxH,j=this.minH):(e=this.dragging.highLimit,f=this.dragging.lowLimit,i=this.minH,j=this.maxH),g=f>=k,h=k>=this.maxPos-e,g){if(0===i.rzsp)return;c=this.getValue("min",k,!0,!1),d=this.getValue("max",k,!0,!1)}else if(h){if(j.rzsp===this.maxPos)return;d=this.getValue("max",k,!0,!0),c=this.getValue("min",k,!0,!0)}else c=this.getValue("min",k,!1),d=this.getValue("max",k,!1);this.positionTrackingBar(c,d)},positionTrackingBar:function(a,b){null!=this.options.minLimit&&a<this.options.minLimit&&(a=this.options.minLimit,b=a+this.dragging.difference),null!=this.options.maxLimit&&b>this.options.maxLimit&&(b=this.options.maxLimit,a=b-this.dragging.difference),this.lowValue=a,this.highValue=b,this.applyLowValue(),this.range&&this.applyHighValue(),this.applyModel(!0),this.updateHandles("lowValue",this.valueToPosition(a)),this.updateHandles("highValue",this.valueToPosition(b))},positionTrackingHandle:function(a){var b=!1;a=this.applyMinMaxLimit(a),this.range&&(this.options.pushRange?(a=this.applyPushRange(a),b=!0):(this.options.noSwitching&&("lowValue"===this.tracking&&a>this.highValue?a=this.applyMinMaxRange(this.highValue):"highValue"===this.tracking&&a<this.lowValue&&(a=this.applyMinMaxRange(this.lowValue))),a=this.applyMinMaxRange(a),"lowValue"===this.tracking&&a>this.highValue?(this.lowValue=this.highValue,this.applyLowValue(),this.applyModel(),this.updateHandles(this.tracking,this.maxH.rzsp),this.updateAriaAttributes(),this.tracking="highValue",this.minH.removeClass("rz-active"),this.maxH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.maxH),b=!0):"highValue"===this.tracking&&a<this.lowValue&&(this.highValue=this.lowValue,this.applyHighValue(),this.applyModel(),this.updateHandles(this.tracking,this.minH.rzsp),this.updateAriaAttributes(),this.tracking="lowValue",this.maxH.removeClass("rz-active"),this.minH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.minH),b=!0))),this[this.tracking]!==a&&(this[this.tracking]=a,"lowValue"===this.tracking?this.applyLowValue():this.applyHighValue(),this.applyModel(),this.updateHandles(this.tracking,this.valueToPosition(a)),this.updateAriaAttributes(),b=!0),b&&this.applyModel(!0)},applyMinMaxLimit:function(a){
  return null!=this.options.minLimit&&a<this.options.minLimit?this.options.minLimit:null!=this.options.maxLimit&&a>this.options.maxLimit?this.options.maxLimit:a},applyMinMaxRange:function(a){var b="lowValue"===this.tracking?this.highValue:this.lowValue,c=Math.abs(a-b);return null!=this.options.minRange&&c<this.options.minRange?"lowValue"===this.tracking?this.highValue-this.options.minRange:this.lowValue+this.options.minRange:null!=this.options.maxRange&&c>this.options.maxRange?"lowValue"===this.tracking?this.highValue-this.options.maxRange:this.lowValue+this.options.maxRange:a},applyPushRange:function(a){var b="lowValue"===this.tracking?this.highValue-a:a-this.lowValue,c=null!==this.options.minRange?this.options.minRange:this.options.step,d=this.options.maxRange;return c>b?("lowValue"===this.tracking?(this.highValue=Math.min(a+c,this.maxValue),a=this.highValue-c,this.applyHighValue(),this.updateHandles("highValue",this.valueToPosition(this.highValue))):(this.lowValue=Math.max(a-c,this.minValue),a=this.lowValue+c,this.applyLowValue(),this.updateHandles("lowValue",this.valueToPosition(this.lowValue))),this.updateAriaAttributes()):null!==d&&b>d&&("lowValue"===this.tracking?(this.highValue=a+d,this.applyHighValue(),this.updateHandles("highValue",this.valueToPosition(this.highValue))):(this.lowValue=a-d,this.applyLowValue(),this.updateHandles("lowValue",this.valueToPosition(this.lowValue))),this.updateAriaAttributes()),a},applyModel:function(a){this.internalChange=!0,this.scope.$apply(),a&&this.callOnChange(),this.internalChange=!1},callOnStart:function(){if(this.options.onStart){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onStart(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}},callOnChange:function(){if(this.options.onChange){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onChange(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}},callOnEnd:function(){if(this.options.onEnd){var a=this,b="lowValue"===this.tracking?"min":"max";this.scope.$evalAsync(function(){a.options.onEnd(a.options.id,a.scope.rzSliderModel,a.scope.rzSliderHigh,b)})}this.scope.$emit("slideEnded")}},h}]).directive("rzslider",["RzSlider",function(a){return{restrict:"AE",replace:!0,scope:{rzSliderModel:"=?",rzSliderHigh:"=?",rzSliderOptions:"&?",rzSliderTplUrl:"@"},templateUrl:function(a,b){return b.rzSliderTplUrl||"rzSliderTpl.html"},link:function(b,c){b.slider=new a(b,c)}}}]);return b.run(["$templateCache",function(a){a.put("rzSliderTpl.html",'<div class=rzslider><span class="rz-bar-wrapper rz-left-out-selection"><span class=rz-bar></span></span> <span class="rz-bar-wrapper rz-right-out-selection"><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class="rz-bar rz-selection" ng-style=barStyle></span></span> <span class="rz-pointer rz-pointer-min" ng-style=minPointerStyle></span> <span class="rz-pointer rz-pointer-max" ng-style=maxPointerStyle></span> <span class="rz-bubble rz-limit rz-floor"></span> <span class="rz-bubble rz-limit rz-ceil"></span> <span class="rz-bubble rz-model-value"></span> <span class="rz-bubble rz-model-high"></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat="t in ticks track by $index" class=rz-tick ng-class="{\'rz-selected\': t.selected}" ng-style=t.style ng-attr-uib-tooltip="{{ t.tooltip }}" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body="{{ t.tooltip ? true : undefined}}"><span ng-if="t.value != null" class=rz-tick-value ng-attr-uib-tooltip="{{ t.valueTooltip }}" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if="t.legend != null" class=rz-tick-legend>{{ t.legend }}</span></li></ul></div>')}]),b.name});