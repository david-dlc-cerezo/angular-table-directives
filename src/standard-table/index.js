(function(){
    'use strict';

    module.exports = function(ngTablesDirectives) {
        require('./standardTable.directive')(ngTablesDirectives);
        require('./noData.directive')(ngTablesDirectives);
        require('./filterField.directive')(ngTablesDirectives);
    };
})();
