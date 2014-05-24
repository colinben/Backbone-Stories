/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React'),
      socket = require('stories.socket'),
      notify = require('notify'),
      self;

  var ConnectionStatus = React.createClass({
    getInitialState: function() {
      return {
        type: 'warning',
        status: 'unconnected'
      };
    },
    setStatus: function(type, status) {

      this.setState({
        type: type,
        status: status
      });

    },
    _initSocketListener: _.once(function() {

      socket.connect().then(function(conn) {
        conn.on('disconnect', function() {
          self.setStatus('warning', 'disconnected');
        });

        conn.on('error', function(reason) {
          self.setStatus('danger', reason);
        });

        conn.on('reconnecting', function() {
          self.setStatus('info', 'reconnecting');
        });

        conn.on('connect', function() {
          self.setStatus('success', 'connected');
        });

      }).
          catch(function(err) {
            self.setStatus('danger', err);
          });

    }),
    componentDidMount: function() {
      this._initSocketListener.call(this);

      //set its current status
      self = this;

      socket.connect().then(function(conn) {
        if (conn.socket.connected) {
          self.setStatus('success', 'connected');
        } else if (conn.socket.connecting) {
          self.setStatus('info', 'connecting');
        } else if (conn.socket.reconnecting) {
          self.setStatus('info', 'reconnecting');
        } else {
          self.setStatus('warning', 'unconnected');
        }
      });

    },
    render: function() {
      return (
          <div className={"connection-status "}>
          Connection:
            <span className={"status " + this.state.type}> {this.state.status} </span>
          </div>
          );
    }
  });

  provide('ConnectionStatus', ConnectionStatus);

})(_provide, _require);
