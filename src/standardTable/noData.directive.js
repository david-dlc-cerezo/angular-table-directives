(function(){
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('standardTableNoData', noDataDirective);
    };

    function noDataDirective() {
        return {
            restrict: 'E',
            scope: {
                titleTranslateKey: '=?',
                bodyTranslateKey: '=?',
                bodyTranslateValues: '=?'
            },
            templateUrl: '/src/standardTable/no-data.html'
        };
    }
})();
