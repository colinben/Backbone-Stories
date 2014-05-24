/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Stories = React.createClass({
    render: function() {
		return (
			<div className="inside cf">
				<ul className="protips-grid cf">
					<li className="">
						<article id="otvneq" className="protip">
							<header>
								<span className="views"> 100 </span>
							</header>
							<a data-from="mini protip" data-action="view protip" className="title hyphenate track x-mode-popup" href="/p/otvneq?&amp;p=3&amp;q=">Vim: Walk through list of colorschemes</a>
							<footer className="cf">
								<ul className="author">
									<li className="user"> by <a title="Authored by: miroslavkoskar" data-from="mini protip" data-action="view protip author" className="track" href="/miroslavkoskar">miroslavkoskar</a>
									</li>
								</ul>
								<ul className="avatars">
									<li className="user">
										<a href="/miroslavkoskar"><img src="https://secure.gravatar.com/avatar/dc7198863d251b0794979cbaea2be10a" alt="Dc7198863d251b0794979cbaea2be10a" />
									</a></li>
								</ul>
							</footer>
						</article>
					</li>
					<li className="">
						<article id="ztbmnq" className="protip">
							<header>
							</header>
							<a data-from="mini protip" data-action="view protip" className="title hyphenate track x-mode-popup" href="/p/ztbmnq?&amp;p=3&amp;q=">Building Nginx/PHP-FPM deb packages via Docker</a>
							<footer className="cf">
								<ul className="author">
									<li className="user">
									by <a title="Authored by: magnetikonline" data-from="mini protip" data-action="view protip author" className="track" href="/magnetikonline">magnetikonline</a>
									</li>
								</ul>
								<ul className="avatars">
									<li className="user">
										<a href="/magnetikonline"><img src="https://secure.gravatar.com/avatar/df1412e1775840374894798d5ed9a7ea" alt="Df1412e1775840374894798d5ed9a7ea" />
										</a>
									</li>
								</ul>
							</footer>
						</article>
					</li>
					<li className="">
						<article id="6evibw" className="protip">
						<header>
						</header>
						<a data-from="mini protip" data-action="view protip" className="title hyphenate track x-mode-popup" href="/p/6evibw?&amp;p=3&amp;q=">ModX Staging clone done right</a>
						<footer className="cf">
						<ul className="author">
							<li className="user">
							by <a title="Authored by: elz64" data-from="mini protip" data-action="view protip author" className="track" href="/elz64">elz64</a>
							</li>
						</ul>
						<ul className="avatars">
							<li className="user">
							<a href="/elz64"><img src="http://pbs.twimg.com/profile_images/461089173869309952/4GCUdux4_normal.png" alt="4gcudux4_normal" />
							</a></li>
						</ul>
						</footer>
						</article>
					</li>
					
				</ul>
				<div className="four-cols-more">
					<div id="more">
						<a rel="next" data-remote="true" data-method="get" data-from="index" data-action="more protips" className="final-more track" href="/?mode=popup&amp;page=4&amp;source=index&amp;width=4">More</a>
					</div>
				</div>
			</div>
		);
    }

  });


  provide('Stories', Stories);

})(_provide, _require);

