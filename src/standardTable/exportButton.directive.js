(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('standardTableExportButton', standardTableExportButtonDirective);
    };

    function standardTableExportButtonDirective() {
        return {
            restrict: 'E',
            scope: true,
            template: require('html-loader!./export-button.html'),
            controller: [
                '$scope',
                StandardTableExportButtonController
            ],
            controllerAs: 'vm'
        };
    }

    function StandardTableExportButtonController($scope) {
        var vm = this;

        /**
         * Get an array with the headers
         * @return {String[]} Array with the headers
         */
        vm.headers = function() {
            var headers = [];
            for (var i = 0; i < $scope.columns.length; i++) {
                headers.push($scope.columns[i].title);
            }
            return headers;
        };
    }
})();
