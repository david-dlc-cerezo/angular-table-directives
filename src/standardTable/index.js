(function(){
    'use strict';

    module.exports = function(ngTablesDirectives) {
        require('./utilities.service')(ngTablesDirectives);
        require('./standardTable.directive')(ngTablesDirectives);
        require('./noData.directive')(ngTablesDirectives);
        require('./exportButton.directive')(ngTablesDirectives);
        require('./filterField.directive')(ngTablesDirectives);
        require('./actionButtons.directive')(ngTablesDirectives);
    };
})();
