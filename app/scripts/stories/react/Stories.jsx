/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Stories = React.createClass({
    render: function() {
    	var stories = '',
    		self = this;
    	if (this.props.data) {
    		stories = this.props.data.map(function(item) {

    			return (
    				<li>
						<article id={item._id} className="protip">
							<header>
								<span className="views"> {item.audit.views} </span>
							</header>
							<a onClick={self.props.showStoryDetail} className="title hyphenate track x-mode-popup" href={"#discovery/p-" + item._id}>{item.content.title}</a>
							<footer className="cf">
								<ul className="author">
									<li className="user"> by <a title={"Authored by: " + item.audit.author.name} data-from="mini protip" data-action="view protip author" className="track" href={"#user/" + item.reference.user_id}>{item.audit.author.name}</a>
									</li>
								</ul>
								<ul className="avatars">
									<li className="user">
										<a href={"#user/" + item.reference.user_id}>
											<img src={item.audit.author.thumbnail} />
										</a>
									</li>
								</ul>
							</footer>
						</article>
					</li>
    			);
    		});
    	}
		return (
			<div className="inside cf">
				<ul className="protips-grid cf">
					{stories}
				</ul>
				<div className="four-cols-more">
					<div id="more">
						<a rel="next" data-remote="true" data-method="get" data-from="index" data-action="more protips" className="final-more track" href={'#discovery/' + this.props.filter + '/' + (this.props.page + 1)}>More</a>
					</div>
				</div>
			</div>
		);
    }

  });


  provide('Stories', Stories);

})(_provide, _require);

