(function() {
    'use strict';

    require('angular');
    require('angular-sanitize');
    require('../../src/module.js');

    angular.module('demoApp', ['ngTablesDirectives'])
        .controller('demoController', [
            '$http',
            DemoController
        ]);

    function DemoController($http) {
        var vm = this;

        vm.columns = [{
                field: 'company',
                title: 'Company'
            },
            {
                field: 'location.city',
                title: 'City',
                filter: true
            },
            {
                field: 'location.country',
                title: 'Country',
                filter: 'select'
            }
        ];

        $http.get('https://api.citybik.es/v2/networks')
            .then(response => {
                vm.tableData = response.data;
            });
    }
})();
