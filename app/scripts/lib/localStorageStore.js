/**
 * Implementation of Store for localStorage capability.
 *
 * port from https://raw.githubusercontent.com/hoatle/webapp-template/master/webapp/js/lib/vsf/store/LocalStorageStore.js
 */

(function(provide, require) {
  var _ = require('_'),
      Backbone = require('Backbone');
  /**
   * Could pass options to denote serialize the value when `set`
   * and deserialize the value when `get`.
   *
   * For example:
   *
   * var lss = new LocalStorageStore({
   *   serialize: JSON.stringify,
   *   deserialize: JSON.parse,
   *   prefix: "stories-"
   * });
   *
   *
   * @type {{serialize: undefined, deserialize: undefined}}
   */
  var defaultOptions = {
    serialize: undefined,
    deserialize: undefined,
    prefix: ''
  };

  /**
   * LocalStorageStore
   *
   * @constructor
   */
  function LocalStorageStore() {
    this.initialize.apply(this, arguments);
  }

  _.extend(LocalStorageStore.prototype, Backbone.Events, {
    initialize: function(options) {
      this.options = _.defaults(options || {}, defaultOptions);
      if (this.isSupported()) {
        this.localStorage = localStorage;
      }
    },
    /**
     * Checks if localStorage is available to use
     */
    isSupported: function() {
        try{
             if (!localStorage) {
               return false;
              }
        }catch(e){
            return false;
        }
      var uid = new Date(),
          result;
      try {
        localStorage.setItem(uid.toString(), uid);
        result = localStorage.getItem(uid.toString()) == uid;
        localStorage.removeItem(uid.toString());
        return result;
      } catch (e) {
        return false;
      }
    },
    /**
     * Sets key with provided value.
     *
     * By default force is false, if key exists -> throw new Error('key exists').
     *
     * If force is true and key exists => override that key.
     *
     * If serialize is a function, store the value from that provided function.
     *
     * event trigger:
     *
     * 'set' => fn(key, value, force)
     *
     * @param key
     * @param value
     * @param force
     */
    set: function(key, value, force) {
      if (!key || !value) {
        throw new Error('key or value undefined');
      }
      force = (force === true);

      value = this.options.serialize ? this.options.serialize(value): value;

      var itemFound = (this.localStorage.getItem(this.options.prefix + key) !== null);

      if (itemFound && !force) {
        throw new Error('key exists: ' + key);
      }

      this.localStorage.setItem(this.options.prefix + key, value);

      this.trigger('set', key, value, force);
      stories.utils.trigger('spinner_done');
    },
    /**
     * Gets value from provided key.
     *
     * If no default value is specified and key does not exists => throw new Error('key does not exists').
     * If default value is specified and key does not exist => return that default value.
     *
     * If deserialize is a function, return the value from that provided function.
     *
     * event trigger:
     *
     * 'get' => fn(key, value, defValue)
     *
     * @param key
     * @param defValue default value
     */
    get: function(key, defValue) {
      if (!key) {
        throw new Error('key undefined');
      }
      var value = this.localStorage.getItem(this.options.prefix + key);

      if (value) {
        value =  this.options.deserialize ? this.options.deserialize(value): value;
      } else if (defValue) {
        value = defValue;
      } else {
        throw new Error('key does not exists: ' + key);
      }

      this.trigger('get', key, value, defValue);
      return value;
    },

    /**
     * Removes a value by a specified key.
     * If key does not exist, just return without throwing any error.
     *
     * If an existing key is removed, trigger event:
     *
     * 'remove' => fn(key, value)
     *
     * @param key
     */
    remove: function(key) {
      if (!key) {
        throw new Error('key undefined');
      }
      var value = this.localStorage.getItem(this.options.prefix + key);

      if (value) {
        this.localStorage.removeItem(this.options.prefix + key);
        this.trigger('remove', key, value);
      }
    },

    /**
     * Finds all matched keys from provided regular expression key.
     *
     * @param keyRegExp
     * @return Array array of {key: '', value: ''}.
     */
    findByKey: function(keyRegExp) {
      var results = [],
          prefix = this.options.prefix;
      for (var key in this.localStorage) {
        if (this.localStorage.hasOwnProperty(key) && key.indexOf(prefix) === 0) {
          var checkingKey = key.substring(prefix.length);
          if (checkingKey.match(keyRegExp)) {
            var result = {},
                value = this.localStorage.getItem(key);
            result[checkingKey] = this.options.deserialize ? this.options.deserialize(value): value;
            results.push(result);
          }
        }
      }
      return results;
    },
    /**
     * Counts the number of matched keys from provided regular expression key.
     *
     * @param keyRegExp
     * @return Number the number of matched keys.
     */
    sizeByKey: function(keyRegExp) {
      var prefix = this.options.prefix,
          count = 0;

      for (var key in this.localStorage) {
        if (this.localStorage.hasOwnProperty(key) && key.indexOf(prefix) === 0) {
          var checkingKey = key.substring(prefix.length);
          if (checkingKey.match(keyRegExp)) {
            count++;
          }
        }
      }
      return count;
    },

    /**
     * Gets the total number of stored items.
     */
    size: function() {
      var prefix = this.options.prefix,
          count = 0;
      for (var key in this.localStorage) {
        if (this.localStorage.hasOwnProperty(key) && key.indexOf(prefix) === 0) {
          count++;
        }
      }
      return count;
    },
    /**
     * Clears all the localStorage.
     *
     * event trigger:
     * 'clear' => fn()
     */
    clear: function() {
      var prefix = this.options.prefix;
      for (var key in this.localStorage) {
        if (this.localStorage.hasOwnProperty(key) && key.indexOf(prefix) === 0) {
          this.localStorage.removeItem(key);
        }
      }
      this.trigger('clear');
    }
  });

  provide('localStorageStore', function(options) {
    return new LocalStorageStore(options);
  });

})(_provide, _require);
