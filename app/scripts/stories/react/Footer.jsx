/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Footer = React.createClass({
    render: function() {
		return (
			<footer id="footer">
				<div className="inside-footer cf">
					<nav id="footer-nav">
						<ul className="footer-links cf">
							<li><a href="/contact_us">Contact</a></li>
							<li><a href="/blog">Blog</a></li>
							<li><a href="/api">API &amp; Hacks</a></li>
							<li><a href="/faq">FAQ</a></li>
							<li><a href="/privacy_policy">Privacy Policy</a></li>
							<li><a href="/tos">Terms of Service</a></li>
							<li><a href="/jobs">Jobs</a></li>
							<li className="employers"><a href="/employers">Employers</a></li>
							<li><a href="/p/t/by_tags">Protips</a></li>
						</ul>
						<ul className="copyright">
							<li>Copyright &copy; 2013 Appdillo Inc. All rights reserved.</li>
						</ul>
					</nav>
				</div>
			</footer>
		);
    }

  });


  provide('Footer', Footer);

})(_provide, _require);

