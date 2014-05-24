/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var DiscoveryNav = React.createClass({
    render: function() {
		return (
			<div id="x-scopes-bar" className="filter-bar">
				<div className="inside cf">
				    <ul id="x-scopes" className="filter-nav">
				      <li>
				        <a id="x-scope-fresh" className="" href="/p/fresh">Fresh</a>
				      </li>
				      <li>
				        <a id="x-scope-trending" className="selected" href="/p/trending">Trending</a>
				      </li>
				      <li>
				        <a id="x-scope-popular" className="" href="/p/popular">Popular</a>
				      </li>
				      <li>
				        <a id="x-scope-liked" className="" href="/p/liked">Liked</a>
				      </li>
				    </ul>
				    <ul className="toggle-nav">
				      <li>
				        <a id="x-scope-toggle" href="/" className="everything switch"></a>
				        </li>
				      <li>
				        <a id="x-followings-toggle" href="/" className="action followings"></a>
				      </li>
				      <li>
				        <a href="/p/new" data-properties="{&quot;context&quot;:&quot;trending&quot;}" data-from="homepage" data-action="create protip" class="action share-tip track"></a>
				      </li>
				      <li>
				        <a id="x-show-search" href="/" className="action search"></a>
				      </li>
				    </ul>
			  	</div>
			</div>
		);
    }

  });


  provide('DiscoveryNav', DiscoveryNav);

})(_provide, _require);

