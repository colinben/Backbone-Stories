/**
 * Utility
 */
(function(provide, require) {

  var _ = require('_'),
      $ = require('jQuery'),
      Backbone = require('Backbone');

  var utils = {};

  _.extend(utils, Backbone.Events);


  _.extend(utils, {
    /**
     * Converts attrs object with any lower_case key to camelCase key.
     *
     * @param attrs
     * @returns {{}}
     */
    convertToCamelCase: function(attrs) {
      var i,
          j,
          newAttrs = {};

      for (i in attrs) {
        if (attrs.hasOwnProperty(i)) {
          j = i.replace(/_\w/g, function(match) {
                return match[1].toUpperCase();
              }
          );
          newAttrs[j] = attrs[i];
        }
      }
      return newAttrs;
    },
    convertStringToCamelCase: function(input) {
      return input.toLowerCase().replace(/_(\w)/g, function(match, group1) {
        return group1.toUpperCase();
      });
    },
    // TODO: AbcDef -> _abc_def
    convertCamelToUnderline: function(input) {
      return input.replace(/[A-Z0-9]/g, function(match) {
        return '_' + match[0].toLowerCase();
      });
    },
    /**
     * Removes any blank, empty keys from obj
     *
     * @param obj
     * @return obj
     */
    removeBlankKeys: function(obj) {
      _.each(obj, function(val, key, obj) {
        if (_.isString(val) && val.trim() === '') {
          delete obj[key]
        }
      });
      return obj;
    },
    /**
     *
     *
     * @param
     * @return
     */
    spinnerButtons: function(buttons, options) {
      var defaults = {
            style: 'expand-left'
          },
          self = this;
      options = $.extend({}, options, defaults);
      $.each(buttons, function() {
        self.spinnerButton( $(this), options );
      });
    },
    spinnerButton: function(button, options) {
      if (button.data('converted') || button.parents('#backtesting').length > 0) return;
      button.data('converted', 1);

      var btn = button;
      if (button[0].nodeName == 'INPUT') {
        button.hide();
        btn = $('<a class="btn ' + button.context.className + '" data-style="'+options.style+'">' +
                   button.context.defaultValue + '</a>');
        button.after(btn);
      }
      btn.addClass('ladda-button');
      var spiner = Ladda.create( btn[0] );

      this.on('spinner_done', function() {
        setTimeout(function() {
          spiner.stop();
        }, 150);
      });

      btn.on('click', function(e) {
        spiner.start();
        button.click();
        return false;
      });

    },
    /**
     *
     *
     * @param
     * @return
     */
    secondsToTime: function(seconds) {
      var minutes = parseInt(seconds/60),
          hours = parseInt(minutes/60),
          days = parseInt(hours/24);

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    },
    /**
     * Creates a compile template function to construct parsed string from string template and params object.
     *
     * var compileTemplate = template(strTemplate);
     * var parsedString = compileTemplate(params, [strict]);
     *
     * params is required otherwise error will be thrown.
     *
     * By default, strict is true and if there is any missing params key for strTemplate then
     * an error will be thrown.
     *
     * If params has unused keys in strTemplate, that keys will be ignored.
     *
     * If strict is false then parsedString will be returned with missing keys.
     *
     * Note: template key must match: \w+
     *
     * For example:
     *
     * var helloTemplate = template('Hello {{name}}!'),
     *     urlTemplate = template('/{{resource}}/{{id}}.json');
     *
     * var output = helloTemplate({name: 'World'}); // => Hello World!
     *
     * helloTemplate(); // => error is thrown
     * helloTemplate({}); // => error is thrown
     *
     * var output2 = helloTemplate({}, false); // => Hello {{name}}!
     *
     * var userUrl = urlTemplate({resource: 'users', id: 1}); // => /users/1.json
     *
     * var pricesTemplate = template('/prices?marketplace={{marketplace}}&&num_results={{num_result}}&&since={{since}}', {
     *   defaults: {
     *     num_result: 80
     *   },
     *   processors: {
     *     since: function(processedStr, paramValue, params) {
     *       if (_.isUndefined(paramValue)) {
     *         processedStr = processStr.replace('&&since={{since}}', '');
     *       }
     *       return processedStr;
     *     }
     *   }
     * });
     *
     * pricesTemplate({marketplace: 'mtgox'}); => /prices/marketplace=mtgox&&num_results=80
     *
     * @param str the string template
     * @param options the optional options
     * @return a compiled template function
     */
    template: function(str, options) {
      return (function(str, options) {
        return function(params, strict) {
          options = _.defaults(options || {}, {
            defaults: {},
            processors: {}
          });
          strict = (strict !== false);

          if (!params) {
            throw new Error('params object is required');
          }

          params = _.defaults(params, options.defaults);

          var keyParamRegex = /{{\w+}}/g,
              keyParamMatches = str.match(keyParamRegex), // [{{key}}, {{key}}]
              parsedString = str;

          _.each(keyParamMatches, function(keyParam) {
            var key = keyParam.substring(2, keyParam.length - 2);

            if (_.isFunction(options.processors[key])) {
              parsedString = options.processors[key].call(this, parsedString, params[key], params);
            } else {
              if (strict && _.isUndefined(params[key])) {
                throw new Error('key "' + key + '" is required');
              }
              if (!_.isUndefined(params[key])) {
                parsedString = parsedString.replace(keyParam, params[key]);
              }
            }
          });
          return parsedString;
        }
      })(str, options);
    }
  });

  provide('stories.utils', utils);

})(_provide, _require);
