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
    var storiesFragment = '/stories&filter={{filter}}&page={{page}}',
        storyFragment = '/story&id={{id}}';

    var baseURL = 'https://yyzxw.net',
        server = '';

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
            server: server
        },
        service: {
            stories: utils.template('mockdata/mock_server/stories_{{filter}}_{{page}}.json'),
            story: utils.template('mockdata/mock_server/story/{{id}}.json')
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
            server: server
        },
        service: {
            stories: utils.template(baseURL + storiesFragment),
            story: utils.template(baseURL + storyFragment),
        }
    };
    //---------------------------------------------------
    // 3) PRODUCTION DEVELOPMENT prod mode specific settings
    var prod = _.extend(common, {
        log: {
            level: $.log.LEVEL.INFO
        },
        socket: {
            server: server
        },
        service: {
            stories: utils.template(baseURL + storyFragment)
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
