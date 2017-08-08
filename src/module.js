(function() {
    'use strict';

    var ngTablesDirectives = angular.module('ngTablesDirectives', [
        'ngSanitize',
        'ngCsv',
        'ui.bootstrap'
    ]);

    require('./standard-table')(ngTablesDirectives);
    require('./filters')(ngTablesDirectives);
})();
