/**
 * stories.service works as a client service to backend server
 */
(function(provide, require) {
  var _ = require('_'),
      RSVP = require('RSVP'),
      settings = require('stories.settings'),
      ls = require('stories.localStorage'),
      $ = require('jQuery'),
      BotOptionModel = require('stories.model.BotOption'),
      MarketOptionModel = require('stories.model.MarketOption'),
      NotificationOptionModel = require('stories.model.NotificationOption'),
      SignupStep = require('stories.model.SignupStep'),
      Markets = require('stories.model.Markets'),
      OptionsModel = require('stories.model.Options'),
      MarketOptionCollection = require('stories.collection.MarketOptions'),
      Services = require('stories.model.Services');

  var frequencyUpdateTimeout = [],
      frequencyUpdateIndex = 0;
  var service = _.extend({
    /**
     * Gets saved models
     *
     * @param
     * @returns {RSVP.Promise}
     */
    getSavedModels: function(reFetch) {
      var modelData = {},
          reFetch = reFetch ? reFetch : false;
      // init models from localStorage or from data
      function initData() {
      }

      if (!reFetch) {
        this.promise = this.promise || new RSVP.Promise(function(resolve, reject) {
          initData();
          resolve(modelData);
        });
      } else {
        this.promise = new RSVP.Promise(function(resolve, reject) {
          initData();
          resolve(modelData);
        });
      }

      return this.promise;
    },

    ifUserRegistered: function(pass, reject) {
      pass();
      return false;
      this.getSavedModels().then(function(models) {
        var model = models.stepsModel,
            queue = model.get('queue'),
            current = model.get('current');

        if (current >= queue.length) {
          pass();
          return;
        }
        reject();
      });
      return false;
    },
    frequencyUpdate: function(options, cb) {
      
      options = _.extend({
        timeout: 60000,
        firstStart: true
      }, options);
      
      stories.router.on('process_action', function() {
        for (var i in frequencyUpdateTimeout) {
          clearTimeout(frequencyUpdateTimeout[i])
        }
      });
      if (options.firstStart) {
        cb();
      }
      frequencyUpdateTimeout[frequencyUpdateIndex] = setInterval(function() {
        cb();
        if (options.message) {
          notify({
            'message': options.message,
            'type': 'success',
            'dismissAfter': 2000,
          });
        }
      }, options.timeout);
      frequencyUpdateIndex++;
    },

    /**
     * Gets model
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getModel: function(model, params) {
      params = params || {};
      model = model || 'stories';
      return new RSVP.Promise(function(resolve, reject) {
        var url = settings.get('service.' + model)(params);
        $.ajax({
          url: url,
          dataType: 'json'
        }).
            done(function(data) {
              resolve(data);
            }).
            fail(function(jqXHR, textStatus) {
              reject(new Error(textStatus));
            })
      });
    },

    /**
     * Gets model url
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getModelUrl: function(model, params) {
      params = params || {};
      model = model || 'stories';
      return settings.get('service.' + model)(params);
    }
  });

  provide('stories.service', service);

})(_provide, _require);
