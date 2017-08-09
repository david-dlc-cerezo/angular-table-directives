(function(){
    'use strict';

    module.exports = function(ngTablesDirectives) {
        require('./dynamicTable.directive')(ngTablesDirectives);
        require('./refreshButton.directive')(ngTablesDirectives);
        require('./loading.directive')(ngTablesDirectives);
    };
})();
