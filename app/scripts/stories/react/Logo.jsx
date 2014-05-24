/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React');

	var Logo = React.createClass({
	    render: function() {
	        return (
	            <div className="wrapper-inner">
	                <div className="logo"><img width={275} border={0} height={57} src="images/logo.png" /></div>
	            </div>
            );
	    }
	});
  provide('Logo', Logo);

})(_provide, _require);

