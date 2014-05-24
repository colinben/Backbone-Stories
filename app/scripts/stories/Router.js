/**
 * The application router
 */
(function(provide, require) {

  var BaseRouter = require('BaseRouter');

  var Router = BaseRouter.extend({
    controllers: {
      discovery: 'Discovery'
    }
  });

  provide('stories.Router', Router);

})(_provide, _require);
