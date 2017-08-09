(function(){
    'use strict';

    module.exports = function(ngTablesDirectives) {
        require('./filterStandartTable')(ngTablesDirectives);
        require('./standardTableToCsv')(ngTablesDirectives);
    };
})();
