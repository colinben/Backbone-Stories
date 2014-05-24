/**
 * Page Options Model
 */
(function(provide, require) {

  var Backbone = require('Backbone'),
      utils = require('stories.utils'),
      ls = require('stories.localStorage');

  var Options = Backbone.Model.extend({
    //global
    defaults: {
      notify: {
        sound: 'media/ding.wav',
        duration: 3
      }
    },

    parse: function(attrs, options) {
      return utils.convertToCamelCase(attrs);
    },
    sync: function(method, model) {
      ls.set('options', this.toJSON(), true);
    }
  });

  provide('stories.model.Options', Options);

})(_provide, _require);
