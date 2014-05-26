// main entry point for the application
// init stuff then start backbone router
(function (provide, require) {
  var $ = require('jQuery'),
      App = require('stories.App'),
      settings = require('stories.settings'),
      ls = require('stories.localStorage');

  //debug to know what's going on with ls
  ls.
      on('get', function(key, value, defValue) {
        $.debug('stories.localStorage get');
        $.debug('stories.localStorage get key: ' + key);
        $.debug('stories.localStorage get value: ' + value);
        $.debug('stories.localStorage get defValue: ' + defValue);

      }).
      on('set', function(key, value, force) {
        $.debug('stories.localStorage set key: ' + key);
        $.debug('stories.localStorage set value: ' + value);
        $.debug('stories.localStorage set force: ' + force);
      }).
      on('remove', function(key, value) {
        $.debug('stories.localStorage remove key: ' + key);
        $.debug('stories.localStorage remove value: ' + value);
      }).
      on('clear', function() {
        $.debug('stories.localStorage clear');
      });


  $.log.setLevel(settings.get('log.level'));

  //must wait onload event to load all jsx stuff on dev mode
  //TODO(hoatle): use settings for env mode; if dev mode, use window.onload
  // if prod mode, use dom ready
  if (settings.get('env') === 'prod') {
    //dom load is enough
    $(function() {
      new App();
    });
  } else { // dev mode
    $(window).load(function() {
      $.debug('main loaded');
      new App();
    });
  }

})(_provide, _require);
