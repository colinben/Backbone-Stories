(function(provide, require) {

  var _ = require('_');

  /**
   * Settings class to support json deep model setting.
   *
   * For example:
   *
   * var settings = new Settings({
   *   env: 'dev',
   *   payment: {
   *     method: 'paypal'
   *   }
   * });
   *
   * var env = settings.get('env');
   * var paymentMethod = settings.get('payment.method');
   *
   * settings.set('payment', {
   *   method: 'stripe',
   *   activated: false
   * }, true);
   *
   * var paymentActivated = settings.get('payment.activated');
   *
   * key must be valid javascript identifier and does not contain ".".
   *
   * @constructor
   */
  function Settings() {
    this.initialize.apply(this, arguments);
  }

  _.extend(Settings.prototype, {

    initialize: function(settings) {
      this.settings = settings;
    },

    /**
     * Gets setting by key, if the key does not exist:
     * + throw Error
     *
     * + If default def is provided and key does not exist, return def.
     *
     * @param key the specified key
     * @param def the default value if key is not found
     */
    get: function(key, def) {
      function getRecursive(settings, parts) {
        var key = parts.shift();
        if (typeof settings[key] !== 'undefined') {
          if (parts.length !== 0) {
            return getRecursive(settings[key], parts);
          }
          return settings[key];
        }
      }

      var parts = key.split('.');
      var value = getRecursive(this.settings, parts);

      if (typeof value !== "undefined") {
        return value;
      }
      if (typeof def !== 'undefined') {
        return def;
      }

      throw Error('Key not found: ' + key);
    },

    /**
     * Sets new key
     *
     * by default, does not allow overwrite existing key.
     *
     * if overwrite existing key without forcing, throw Error.
     *
     * @param key
     * @param value
     * @param force
     */
    set: function(key, value, force) {
      force = (force === true);

      function setRecursive(settings, parts) {
        var key = parts.shift();

        if (!this.isValidKey(key)) {
          throw Error('Invalid key: ' + key);
        }

        if (typeof settings[key] !== 'undefined' && !force) {
          throw Error('Key exists: ' + key);
        }

        if (parts.length !== 0) {
          settings[key] = {};
          return setRecursive.call(this, settings[key], parts);
        }

        settings[key] = value;
      }


      var parts = key.split('.');
      setRecursive.call(this, this.settings, parts);
    },
    /**
     * Checks if a key is valid or not.
     *
     * key must be valid javascript identifier and does not contain "."
     *
     * @param key
     */
    isValidKey: function(key) {
      return key != '' && key.indexOf('.') < 0 && key.indexOf(' ') < 0;
    }

  });

  function settings(settings) {
    return new Settings(settings);
  }

  provide('settings', settings);

})(_provide, _require);
