/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Footer = React.createClass({
    render: function() {
		return (
			<footer id="footer">
				<div className="inside-footer cf">
					<div id="tweetbtn">
						<a data-width="300" data-show-count="false" className="twitter-follow-button" href="https://twitter.com/coderwall">Follow @coderwall</a>
						<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>
					</div>
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
						<ul className="credits">
							<li></li>
						</ul>
						<ul className="mixpanel">
							<li>
								<a href="https://mixpanel.com/f/partner">
								<img alt="Real Time Web Analytics" src="https://mixpanel.com/site_media/images/partner/badge_light.png" />
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		);
    }

  });


  provide('Footer', Footer);

})(_provide, _require);

