/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Footer = React.createClass({
    render: function() {
      return (

          <div className="copy-right">Copyright &copy; 2014 <a href="%CompanyUrl%">%CompanyUrl%</a>. All rights reserved.</div>

          );
    }

  });


  provide('Footer', Footer);

})(_provide, _require);

