(function(provide, require) {
  var _ = require('_');

  var conf = _.extend({
    env: 'dev'  //client development
    //env: 'localdev' //development with local server
    //env: 'prod' //work on production
  });

  provide('stories.conf', conf);

})(_provide, _require);
