(function() {
    'use strict';

    var ngTablesDirectives = angular.module('ngTablesDirectives', [
        'ngSanitize',
        'ngCsv',
        'ui.bootstrap',
        'angular.filter'
    ]);

    require('./standardTable')(ngTablesDirectives);
    require('./groupTables')(ngTablesDirectives);
    require('./filters')(ngTablesDirectives);
})();
