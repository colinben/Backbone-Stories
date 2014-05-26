/**
 * localStorage instance of LocalStorageStore, use JSON object as stored value.
 */
(function(provide, require) {

  var localStorageStore = require('localStorageStore'),
      JSON = require('JSON');

  var ls = localStorageStore({
    prefix: 'stories-',
    serialize: JSON.stringify,
    deserialize: JSON.parse
  });

  provide('stories.localStorage', ls);

})(_provide, _require);
