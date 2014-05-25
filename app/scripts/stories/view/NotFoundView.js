/**
 * The NotFound view
 */

(function (provide, require) {
  var $ = require('jQuery'),
      BaseView = require('BaseView'),
      React = require('React');

  var NotFoundView = BaseView.extend({

    showIndex: function() {

        React.renderComponent(
            NotFound(),
            this.$container[0]
        );
    }
  });

  provide('stories.view.NotFoundView', NotFoundView);

})(_provide, _require);
