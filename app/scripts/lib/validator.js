/**
 * Validator
 */
(function(provide, require) {

  var _ = require('_'),
      Backbone = require('Backbone');

  var validator = {};

  _.extend(validator, Backbone.Events);

  _.extend(validator, {
    isNumber: function(input) {
      return !isNaN(parseFloat(input)) && isFinite(input);
    },
    isInteger: function(input) {
      return parseFloat(input) == parseInt(input, 10) && !isNaN(input);
    },
    isEmail: function(input) {
      return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input);
    },
    isBool: function(input) {
      return input === true || input === false;
    },
    hasValueOrEmpty: function(input) {
      return /(\.+)?/.test(input);
    }
  });

  _.extend(validator, {

    /**
     * Validate with provided values and dict
     * @dict must follow:
     * var dict =  {
        "index": {
     *    validator: "isNumber", // "isInteger", ....
     *    message: "Message to return when occured an error",
     *    required: false
     *   }
     * }
     *
     * @param dict
     * @return values
     */
    validate: function(dict, values) {
      var error = [];
      _.each(dict, function(value, index) {
        var key = value.id ? value.id : index;

        // check if required and return error if failure
        if (value.required && !values[index]) {
          error.push({key:key, message:value.message});
          return false;
        }

        if(validator[value.validator] && values[index]) {
          if(!validator[value.validator](values[index])) {
            error.push({key:key, message:value.message});
            return false;
          }
        }
      });
      return error.length > 0 ? error : false;
    }
  });

  provide('validator', validator);

})(_provide, _require);
