/**
 * global stories.event bus
 */
(function (provide, require, Backbone) {

  var event = _.extend({}, Backbone.Events);

  provide('stories.event', event);

})(provide, require, Backbone);
