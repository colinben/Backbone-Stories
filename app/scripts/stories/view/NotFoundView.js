/**
 * The NotFound view
 */

(function (provide, require) {
  var $ = require('jQuery'),
      BaseView = require('BaseView'),
      React = require('React'),
      NavBar, Footer, NotFound;

  var NotFoundView = BaseView.extend({

    showIndex: function() {

      var $notFound = $('.not-found');

      if ($notFound.length < 1) {
        this.$container.empty().
            append('<div class="header"></div>').
            append('<div class="not-found"></div>').
            append('<div class="footer"></div>');

        NavBar = require('NavBar');
        Footer = require('Footer');
        NotFound = require('NotFound');

        React.renderComponent(
            NavBar({}),
            $('.header')[0]
        );

        React.renderComponent(
            Footer({}),
            $('.footer')[0]
        );

        React.renderComponent(
            NotFound({}),
            $('.not-found')[0]
        );
      }
    }
  });

  provide('stories.view.NotFoundView', NotFoundView);

})(_provide, _require);
