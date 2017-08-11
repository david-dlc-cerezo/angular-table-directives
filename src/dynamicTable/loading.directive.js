(function(){
    'use strict';

    const path = require('path');

    module.exports = function(ngModule) {
        ngModule.directive('dynamicTableLoading', loadingDirective);
    };

    function loadingDirective() {
        return {
            restrict: 'E',
            templateUrl: path.resolve(__dirname, 'src/dynamicTable/loading.html')
        };
    }
})();
