/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var NotFound = React.createClass({
    render: function() {
      return (
          <div id="notfound">
            <Header />
            <div className="inside cf">
              <div className="jumbotron">
                <p>Oops! There page youre looking for does not exist.</p>
                <a href="#" className="btn btn-primary">Go to home page</a>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
  });

  provide('NotFound', NotFound);

})(_provide, _require);

