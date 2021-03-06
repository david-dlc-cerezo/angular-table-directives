(function() {
    'use strict';

    require('angular');
    require('angular-sanitize');
    require('angular-bootstrap');
    require('angular-filter');
    require('ng-csv');
    require('../../src/module.js');

    angular.module('demoApp', ['ngTablesDirectives'])
        .controller('demoController', [
            '$http',
            '$q',
            DemoController
        ]);

    function DemoController($http, $q) {
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

        vm.actions = [{
            title: 'Delete',
            icon: 'fa fa-fw fa-trash',
            showIf: (rowData) => (rowData.location.city.indexOf('a') !== -1),
            onClick: (rowData) => {
                for(var i in vm.tableData){
                    if(vm.tableData[i] === rowData){
                        vm.tableData.splice(i, 1);
                        break;
                    }
                }
            }
        }];


        vm.loadData = function(){
            var deferred = $q.defer();

            $http.get('https://api.citybik.es/v2/networks')
                .then(response => {
                    vm.tableData = response.data.networks;
                    deferred.resolve(response.data.networks);
                })
                .catch(deferred.reject);

            return deferred.promise;
        };
        vm.loadData();
    }
})();
