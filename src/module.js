(function() {
    'use strict';

    var ngTablesDirectives = angular.module('ngTablesDirectives', [
        'ngSanitize'
    ]);

    require('./standard-table')(ngTablesDirectives);
    require('./filters/filterStandartTable.js')(ngTablesDirectives);
    require('./filters/standardTableToCsv.js')(ngTablesDirectives);
})();
