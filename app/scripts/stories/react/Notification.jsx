/** @jsx React.DOM */
/**
 * Notification component.
 *
 * By default, it's dismissable if dismissable not specified to be "false".
 *
 * Usage:
 *
 * <Notification type="info" onDimission={fn} dismissAfter={num}>message</Notification>
 *
 * Animation could be added by specified animate property, by default:
 *
 * animate: {
 *   whenOpen: {
 *     height: 'show'
 *   },
 *   whenDismiss: {
 *     height: 'hide'
 *   },
 *   easing: 'linear',
 *   speed: 500,
 * }
 *
 *
 */
(function(provide, require) {
  var React = require('React');

  var Notification = React.createClass({
    propTypes: {
      id: React.PropTypes.number,
      onDismiss: React.PropTypes.func,
      dismissAfter: React.PropTypes.number,
      type: React.PropTypes.string,
      dismissable: React.PropTypes.bool,
      animate: React.PropTypes.object,
      notifyInstance: React.PropTypes.object
    },

    getDefaultProps: function () {
      return {
        type: 'info',
        dismissable: true,
        animate: {
          whenOpen: {
            height: 'show'
          },
          whenDismiss: {
            height: 'hide'
          },
          easing: 'linear',
          speed: 500
        },
        notifyInstance : {}
      };
    },
    renderDismissButton: function () {
      return (

          <button type="button" className="close" onClick={this.dismiss} aria-hidden="true">&times;</button>

          );
    },

    render: function() {
      var isDismissable = this.props.dismissable;
      var className = "alert " + (isDismissable ? "alert-dismissable " : "") + 'alert-' + this.props.type;
      return (
          <div style={{display: this.props.onUpdate }}>
            <div className={className}>
        {isDismissable ? this.renderDismissButton() : null}
        {this.props.children}
            </div>
          </div>
          );
    },
    componentWillMount: function(){
      this.props.notifyShowing();
      this.props.onUpdate = 'none';
    },

    dismiss: function() {
      var node = $(this.getDOMNode()),
          animate = $.extend({}, this.getDefaultProps().animate, this.props.animate),
          t = this;
      clearTimeout(this.dismissTimer);

      if(t.props.onDismiss){
        t.props.onDismiss(this, function(afterAnimateCB){
          node.animate(animate.whenDismiss, animate.speed, function(){
            afterAnimateCB();
          });
        });
      }
      node.animate(animate.whenDismiss, animate.speed);
    },
    componentWillUpdate: function(){
      clearTimeout(this.dismissTimer);
    },
    componentDidUpdate: function(){
      var notify = this;
      this.props.notifyInstance.animate = $.extend({}, notify.getDefaultProps().animate, notify.props.animate);
      this.props.notifyInstance.node = $(notify.getDOMNode());
      this.props.onUpdate = 'block';
      if (this.props.dismissAfter && this.props.onDismiss) {
        this.dismissTimer = setTimeout(this.dismiss, this.props.dismissAfter);
      }
    },
    componentWillUnmount: function() {
      clearTimeout(this.dismissTimer);
    },

    componentDidMount: function() {
      var notify = this,
          animate = $.extend({}, notify.getDefaultProps().animate, notify.props.animate),
          node = $(notify.getDOMNode());

      this.props.notifyInstance.animate = animate;
      this.props.notifyInstance.node = node;

      if (this.props.dismissAfter && this.props.onDismiss) {
        this.dismissTimer = setTimeout(this.dismiss, this.props.dismissAfter);
      }
      node.addClass('animate-'+(Object.keys(animate.whenOpen)[0]))
          .animate(animate.whenOpen, animate.speed, animate.easing);
    }

  });
  provide('Notification', Notification);

})(_provide, _require);

