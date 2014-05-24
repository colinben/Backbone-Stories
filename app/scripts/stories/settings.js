/**
 * stories application settings
 */
(function (provide, require) {

    var _ = require('_'),
        settings = require('settings'),
        utils = require('stories.utils'),
        conf = require('stories.conf');

    //do not touch this directly, please edit env in stories/conf.js (see README for more info of
    // Project environment profiles
    if (conf && conf.env) {
      console.log("EVN " + conf + " " + conf.env);
    }
    var env = (conf && conf.env) || 'dev';

    // common settings for production
    var common = {
        env: env,
        controller: {
            namespace: 'stories.controller'
        },
        dateFormat: "yyyy-mm-dd"
    };

    //-------- RPC QUERY STRINGS PASSED TO THE REMOTE SERVICE------------
    var basicQsFragment = 'marketplace={{marketplace}}&base={{base}}&currency={{currency}}&interval={{interval}}';
    var botFragment = '&ema_short={{ema_short}}&ema_long={{ema_long}}&algo={{ma_algo}}';
    var backtestingFragment = '&buy_1={{buy_1}}&sell_1={{sell_1}}&start_fund={{start_fund}}&base={{base}}&currency={{currency}}&stop_loss={{stop_loss}}&btc_fund={{btc_fund}}';


    var candlesQString = '/api/v1/candles?' + basicQsFragment + botFragment + '&num_results={{num_results}}';
    var pricesQString = '/api/v1/prices?' + basicQsFragment + botFragment + '&since={{since}}&until={{until}}';
    var backtestingQString = '/api/v1/backtest?' + basicQsFragment + botFragment + backtestingFragment + '&since={{since}}&until={{until}}';

    var marketQString =   '/api/v1/availableMarkets';
    var notifyQString =   '/api/v1/notify';
    var localDev_baseURL = 'https://localdev.yyzxw.net:8000';
    var prod_baseURL = 'https://yyzxw.net';

    //--------RPC service defaults -------------
    var backtestingDefaults = {
        defaults: {
            ma_algo: "simple",
            stop_loss: .22
        }
    };
    var candlesDefaults = {
        defaults: {
            num_results: 80,
            ma_algo: "simple"
        }
    };
    var pricesDefaults = {
        defaults: {ma_algo: "simple"},
        processors: {
            //note that this is default fixed values, since and util could not specified by params
            since: function (parsedString, paramValue, params) {
                if (params['interval']) {
                    var now = new Date().getTime(),
                        since = now - (params['interval'] * 80); //formula provided by Troy
                    parsedString = parsedString.replace('{{since}}', since);
                }
                return parsedString;
            },
            until: function (parsedString, paramValue, params) {
                var now = new Date().getTime();
                return parsedString.replace('{{until}}', now);
            }
        }
    }
    //====== service templates ========================


//---------------------------------------------------
    //1) NORMAL DEVELOPMENT mode specific settings
    // this is meant for normal client development locally
    // working against production server via https, defaults to port 443
    var dev = {
        log: {
            level: $.log.LEVEL.TRACE
        },
        socket: {
            server: prod_baseURL
        },
        service: {
            settings: utils.template('mockdata/mock_localstore/settings.json'),
            candles: utils.template('mockdata/mock_server/candles/{{marketplace}}_{{currency}}_{{base}}.json'),
            prices: utils.template('mockdata/mock_server/prices/{{marketplace}}_{{currency}}_{{base}}.json'),
            //markets: utils.template(prod_baseURL + marketQString),
            markets: utils.template('mockdata/mock_server/markets/available.json'),
            notify:   utils.template(prod_baseURL + notifyQString),
            backtesting: utils.template(prod_baseURL + backtestingQString, backtestingDefaults)
             /*candles: candlesUrlTemplate,
             prices: pricesUrlTemplate,
             backtesting: backtestingUrlTemplate*/
        }
    };
    //---------------------------------------------------
    // 2) LOCAL DEVELOPMENT mode specific settings
    // this is meant for normal client development locally AND local server development
    // NOTE: can't use 443 typically already in use
    var localdev = {
        log: {
            level: $.log.LEVEL.TRACE
        },
        socket: {
            server: localDev_baseURL
        },
        service: {
            candles: utils.template(localDev_baseURL + candlesQString, candlesDefaults),
            prices: utils.template(localDev_baseURL + pricesQString, pricesDefaults),
            backtesting: utils.template(localDev_baseURL + backtestingQString, backtestingDefaults),
            notify:   utils.template(localDev_baseURL + notifyQString),
            markets: utils.template(localDev_baseURL + marketQString)
        }
    };
    //---------------------------------------------------
    // 3) PRODUCTION DEVELOPMENT prod mode specific settings
    var prod = _.extend(common, {
        log: {
            level: $.log.LEVEL.INFO
        },
        socket: {
            server: prod_baseURL
        },
        service: {
            candles: utils.template(prod_baseURL + candlesQString, candlesDefaults),
            prices: utils.template(prod_baseURL + pricesQString, pricesDefaults),
            backtesting: utils.template(prod_baseURL + backtestingQString, backtestingDefaults),
            notify:   utils.template(prod_baseURL + notifyQString),
            markets: utils.template('mockdata/mock_server/markets/available.json')
        }
    });


    //provide
    if (env === 'prod') {
        provide('stories.settings', settings(_.extend(common, prod)));
    } else if (env === 'localdev') {
        provide('stories.settings', settings(_.extend(common, localdev)));
    } else {
        provide('stories.settings', settings(_.extend(common, dev)));
    }
})(_provide, _require);
