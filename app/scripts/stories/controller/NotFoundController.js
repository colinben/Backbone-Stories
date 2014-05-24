/**
 * The NotFound controller if there is no controller matching by the router.
 */

(function(provide, require) {

  var $ = require('jQuery'),
      _ = require('_'),
      Backbone = require('Backbone'),
      BaseController = require('BaseController'),
      NotFoundView = require('stories.view.NotFoundView');

  var NotFoundController = BaseController.extend({

    index: function(params) {
      var notFoundView = new NotFoundView({
        $container: $('#container')
      });
      notFoundView.showIndex();
    }
  });

  provide('stories.controller.NotFoundController', NotFoundController);

})(_provide, _require);
