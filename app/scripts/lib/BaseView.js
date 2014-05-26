/**
 * The BaseView to be extended by concrete views.
 *
 * @author hoatle
 */

(function(provide, require) {

  var Backbone = require('Backbone'),
      _ = require('_'),
      $ = require('jQuery');

  var BaseView = Backbone.View.extend({
    /**
     * The pre-initialize phase for override
     *
     * @param options
     * @return {*}
     */
    beforeInitialize: function(options) {
      return this;
    },

    /**
     * Initializes the view.
     *
     * @param options the options literal object, usually have: $container, model and appendable attribute.
     */
    initialize: function(options) {

      //indicates if the view is rendered or not
      this.rendered = false;

      this.beforeInitialize.apply(this, arguments);

      _.bind(_ensureValid, this);

      this.$container = this.$container || options.$container;
      this.model = this.model || options.model || new Backbone.Model();
      this.collection = this.collection || options.collection || new Backbone.Collection();

      this.appendable = this.appendable || options.appendable;

      this.afterInitialize.apply(this, arguments);
    },

    /**
     * The after-initialize phase for override
     *
     * @param options
     * @return {*}
     */
    afterInitialize: function(options) {
      return this;
    },

    /**
     * The pre render phase for override
     *
     * @return {*}
     */
    beforeRender: function() {
      return this;
    },

    container: function() {
      return _.isString(this.$container) ? $(this.$container) : this.$container;
    },

    /**
     * Renders the view
     *
     * @return {*}
     */
    render: function() {
      this.beforeRender();

      if (_ensureValid()) {
        var c = this.container();
        if (this.appendable) {
          c.append(this.$el);
        } else {
          c.html(this.$el);
        }
        this.delegateEvents();
      }

      this.afterRender();

      this.rendered = true;

      return this;
    },

    /**
     * The after render phase for override
     *
     * @return {*}
     */
    afterRender: function() {
      return this;
    },

    update: function(model) {
      this.model = model;
      this.destroy();
      this.initialize();
      this.render();
    }

  });

  function _ensureValid() {
    if (_.isNull(this.$container) || _.isNull(this.el)) {
      $.log('this.$container or this.el is null, invalid state');
      return false;
    }
    return true;
  }


  provide('BaseView', BaseView);

})(_provide, _require);
