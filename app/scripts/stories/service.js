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
     * Gets prices
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getPrices: function(params) {
      params = params || {};
      return new RSVP.Promise(function(resolve, reject) {
        var pricesUrl = settings.get('service.prices')(params);
        $.ajax({
          url: pricesUrl,
          dataType: 'json'
        }).
            done(function(data) {
              resolve(data);
            }).
            fail(function(jqXHR, textStatus) {
              reject(new Error(textStatus));
            });
      });
    },
    /**
     * Gets candles
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getCandles: function(params) {
      params = params || {};
      return new RSVP.Promise(function(resolve, reject) {
        var candlesUrl = settings.get('service.candles')(params);
        $.ajax({
          url: candlesUrl,
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
     * Gets backtesting
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getBacktesting: function(params) {
      params = params || {};
      return new RSVP.Promise(function(resolve, reject) {
        var backtesting = new Services(params, {parse: true});
        if (!backtesting.isValid()) {
          reject(backtesting.validationError);
          return;
        }
        _.each(backtesting.defaults, function(item, index) {
          if (!params[index]) params[index] = item;
        });
        var url = settings.get('service.backtesting')(params);
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
     * Gets available markets
     *
     * @param params
     * @returns {RSVP.Promise}
     */
    getAvailableMarkets: function(params) {
      params = params || {};
      return new RSVP.Promise(function(resolve, reject) {
        var url = settings.get('service.markets')(params);
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
       * notify by sms and email
       *
       * @param params
       * @returns {RSVP.Promise}
       */
      notify: function(params) {
          params = params || {};
          return new RSVP.Promise(function(resolve, reject) {
             // var url = settings.get('service.markets')(params);
              $.ajax({
                  url:  settings.get('service.notify')(params),
                  dataType: 'json'
              }).
                  done(function(data) {
                      console.log(data.email) ;
                      resolve(data);
                  }).
                  fail(function(jqXHR, textStatus) {
                      reject(new Error(textStatus));
                  })
          });
      },
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
        //botOptionModel
        modelData.optionsData = ls.get('options_bot');
        modelData.optionsModel = new OptionsModel(modelData.optionsData, {parse: true});

        console.log('optionsModel', modelData.optionsModel);

        //botOptionModel
        modelData.botOptionData = ls.get('options_bot');
        modelData.botOptionModel = new BotOptionModel(modelData.botOptionData, {parse: true});

        console.log('botOptionModel', modelData.botOptionModel);

        //globalOptionModel
        modelData.globalOptionData = ls.get('options_global');
        modelData.globalOptionModel = new MarketOptionModel(modelData.globalOptionData, {parse: true});

        console.log('globalOptionModel', modelData.globalOptionModel);

        //notificationOptionModel
        modelData.notificationOptionData = ls.get('options_notification');
        modelData.notificationOptionModel = new NotificationOptionModel(modelData.notificationOptionData, {parse: true});

        console.log('notificationOptionModel', modelData.notificationOptionModel);

        //stepsModel
        modelData.stepsData = ls.get('signup_steps');
        modelData.stepsModel = new SignupStep(modelData.stepsData, {parse: true});
        console.log('stepsModel', modelData.stepsModel);

        //marketsOptionModel
        modelData.marketsOptionData = ls.get('options_markets');
        modelData.marketsOptionModel = new Markets(modelData.marketsOptionData, {parse: true});

        console.log('marketsOptionModel', modelData.marketsOptionModel);
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

    ifUserRegistered: function(pass, reject) {pass();return;
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
    }
  });

  provide('stories.service', service);

})(_provide, _require);
