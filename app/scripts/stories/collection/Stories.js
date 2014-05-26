/**
 * Stories Collection
 */
(function(provide, require) {

  var Backbone = require('Backbone'),
      Story = require('stories.model.Story');

  var Stories = Backbone.Collection.extend({
    model: Story,
    parse: function(response) {
	    return response.results;
	  }
  });

  provide('stories.collection.Stories', Stories);

})(_provide, _require);
