(function(){
    'use strict';

    const path = require('path');

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
            templateUrl: path.resolve(__dirname, 'src/standardTable/no-data.html')
        };
    }
})();
