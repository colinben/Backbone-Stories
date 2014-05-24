/**
 * stories.socket
 */
(function(provide, require) {

  var _ = require('_'),
      Backbone = require('Backbone'),
      settings = require('stories.settings'),
      io = require('io'),
      $ = require('jQuery'),
      RSVP = require('RSVP');

  var socket = {};

  _.extend(socket, Backbone.Events);

  _.extend(socket, {
    /**
     * Opens a new socket connection if not connected yet,
     * and return the connection socket object.
     */
    connect: function() {
      var self = this;
      this.promise = this.promise || new RSVP.Promise(function(resolve, reject) {
        if (self.connection) {
          resolve(self.connection);
          return;
        }


        var socketServer = settings.get('socket.server'),
            uri = io.util.parseUri(socketServer);

        var isSecure = uri.protocol.indexOf('https') === 0;

        //explicit specify port if not specified
        // 80 for http and 443 for https
        if (uri.port === '') {
          socketServer = isSecure ? (socketServer + ':443') : (socketServer + ':80');
        }

          $.debug('stories.socket::connect::new socket connection to ' + socketServer + ' isSecure ' + isSecure);

        //todo make withcredentials true
        $.ajax({
          url: socketServer + '/cookie',
          xhrFields: {
            withCredentials: true
          }
        }).done(function(data) {
           $.debug('stories.socket::connect::cookie request done');
           self.connection = io.connect(socketServer, {secure: isSecure});
           $.debug('stories.socket::connect::connecting');
           resolve(self.connection);
           self.trigger('connect', self.connection);

        }).fail(function(jqXHR, textStatus, errorThrown) {
          reject(textStatus);
        });

      });

      return this.promise;
    },
    /**
     * Disconnects existing socket if the socket is connected else does nothing.
     */
    disconnect: function() {
      if (this.connection) {
        this.connection.disconnect();
        delete this.connection;
        this.trigger('disconnect');
      }
    }
  });

  provide('stories.socket', socket);

})(_provide, _require);
