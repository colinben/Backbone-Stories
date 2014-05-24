/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var NotFound = React.createClass({
    render: function() {
      return (
          <div className={"not-found"}>
            <div className="alert alert-danger">
            Error: Page Not Found.
            </div>
            <div className="jumbotron">
              <p>Oops! There page you're looking for does not exist.</p>
              <a href="#" className="btn btn-primary">Go to home page</a>
            </div>
          </div>
          );
    }
  });

  provide('NotFound', NotFound);

})(_provide, _require);

