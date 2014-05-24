/** @jsx React.DOM */

/**
 * notify service
 *
 * Usage:
 *
 * notify({
 *   message: '',
 *   type: '',
 *   onDismiss: fn,
 *   dismissAfter: number
 * });
 */
(function(provide, require) {
  var _ = require('_'),
      React = require('React');

  var Notifications = React.createClass({
    propTypes: {
      notifications: React.PropTypes.array
    },
    getDefaultProps: function() {
      return {
        notifications: []
      };
    },

    getInitialState: function() {
      return {notifications: []};
    },

    handleRemove: function(component, animateCB) {
      var t = this,
          noties = this.props.notifications;
      for (var i = 0; i < noties.length; i++) {
        if (noties[i].id === component.props.key) {
          if (noties[i].onDismiss) {
            noties[i].onDismiss(component);
          }
          noties.splice(i, 1);
          animateCB(function() {
            t.setState({notifications: noties});
          });
          break;
        }
      }
      this.notifyEnding();
    },
    notifyShowing: function() {
      notify.trigger('notify_start');
    },
    notifyEnding: function() {
      notify.trigger('notify_end');
    },
    render: function() {
      var rows = [];
      var i = 0;
      var t = this;
      t.props.notifications.forEach(function(notification) {
        var notifyView = <Notification key={notification.id} type={notification.type}
        notifyShowing={t.notifyShowing}
        animate={notification.animate}
        onDismiss={t.handleRemove}
        dismissAfter={notification.dismissAfter}
        dismissable={notification.dismissable}
        notifyInstance={{}}>
          <div dangerouslySetInnerHTML={{__html: notification.message}}/>
        </Notification>;
        t.props.notifications[i].notifyView = notifyView;
        rows.push(notifyView);
        i = i + 1;
      });
      return (
          <div>
          {rows}
          </div>
          );
    }
  });

  function Notify(options) {
    var t = this;
    t.notifyKey = (new Date()).getTime();
    $(function() {
      //prepend to the body if not exist
      if (document.getElementById('notify-container') == null) {
        $('body').prepend('<div id="notify-container"></div>');
      }
      t.component = React.renderComponent(
          <Notifications />,
          document.getElementById('notify-container')
      );
      $.extend(options, {id: t.notifyKey});
      t.component.props.notifications.push(options);
      t.component.setState({notifications: t.component.props.notifications});
    });
  }

  Notify.prototype = {
    getKey: function() {
      return this.notifyKey;
    },
    dismiss: function() {
      var t = null,
          notifications = this.component.props.notifications;
      for (var i = 0; i < notifications.length; i++) {
        if (this.notifyKey === notifications[i].id) {
          dismissNotifyView(this.component, notifications[i].notifyView);
          break;
        }
      }
    }
  };


  var notify = function(options) {
    return new Notify(options);
  };

  _.extend(notify, Backbone.Events);

  notify.dismissAll = function() {
    var component = React.renderComponent(
        <Notifications />,
        document.getElementById('NotifyContainer')
    );
    var notifications = component.props.notifications,
        noti_len = notifications.length;

    while (noti_len > 0 && notifications[0]) {
      dismissNotifyView(component, notifications[0].notifyView);
    }
  };

  function dismissNotifyView(component, notifyView) {
    var animate = notifyView.props.notifyInstance.animate,
        node = notifyView.props.notifyInstance.node;
    component.handleRemove(notifyView, function(afterAnimateCB) {
      node.animate(animate.whenDismiss, animate.speed, function() {
        afterAnimateCB();
      });
    });
  }

  provide('notify', notify);

})(_provide, _require);
