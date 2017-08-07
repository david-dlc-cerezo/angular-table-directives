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
            templateUrl: '/src/standard-table/no-data.html'
        };
    }
})();
