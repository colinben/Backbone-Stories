/**
 * MarketOption Collection
 */
(function(provide, require) {

  var Backbone = require('Backbone'),
      MarketOption = require('stories.model.MarketOption');

  var MarketOptions = Backbone.Collection.extend({
    model: MarketOption
  });

  provide('stories.collection.MarketOptions', MarketOptions);

})(_provide, _require);
