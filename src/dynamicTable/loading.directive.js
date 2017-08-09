(function(){
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('dynamicTableLoading', loadingDirective);
    };

    function loadingDirective() {
        return {
            restrict: 'E',
            templateUrl: '/src/dynamicTable/loading.html'
        };
    }
})();
