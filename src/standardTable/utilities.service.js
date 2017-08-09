(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.service('StandardTableUtilities', StandardTableUtilities);
    };

    function StandardTableUtilities() {
        var StandardTableUtilities = this;

        StandardTableUtilities = {
            /**
             * Get the value to show for a row and a field name
             * @param  {Object} row       Data onject for the row
             * @param  {String} field     Field name to show
             * @param  {String} separator [Optional] Separator for arrays
             * @return {String}           Value to show
             */
            getValue(row, field, separator = '<br/>') {
                if (angular.isObject(row) && angular.isString(field)) {
                    var dotIndex = field.indexOf('.');
                    if (dotIndex !== -1) {
                        return this.getValue(row[field.substr(0, dotIndex)], field.substr(dotIndex + 1));
                    } else {
                        // If the result is a fuction -> run it
                        var value = angular.isFunction(row[field]) ? row[field]() : row[field];
                        // If the result is an array -> join it
                        value = (angular.isArray(value)) ? value.join(separator) : value;
                        return value;
                    }
                } else {
                    return '';
                }
            }
        };

        return StandardTableUtilities;
    }
})();
