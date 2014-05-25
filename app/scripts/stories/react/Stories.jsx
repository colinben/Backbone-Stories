/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Stories = React.createClass({
  	getInitialState: function() {
      return {stories: [], paginate: ''};
    },
  	addStories: function(data) {
  		var self = this,
  			stories = '';
  		
  		stories = data.map(function(item) {

			return (
				<li>
					<article id={item._id} className="protip">
						<header>
							<span className="views"> {item.audit.views} </span>
						</header>
						<a onClick={self.props.showStoryDetail} className="title hyphenate track x-mode-popup" href={"#discovery/p-" + item._id}>{item.content.title}</a>
						<footer className="cf">
							<ul className="author">
								<li className="user"> by <a title={"Authored by: " + item.audit.author.name} className="track" href={"#user/" + item.reference.user_id}>{item.audit.author.name}</a>
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
		this.setState({stories: this.state.stories.concat(stories)});
  	},
  	setPaginate: function(page) {
  		var paginate = '';
  		if (page > 0) {
  			paginate = 	<div className="four-cols-more">
							<div id="more">
								<a onClick={this.props.getMoreStories} className="final-more track" href={'#discovery/' + this.props.filter + '/' + (page + 1)}>More</a>
							</div>
						</div>;
  		}
  		this.setState({paginate: paginate});
  	},
  	componentWillMount: function() {
    	if (this.props.data) {
    		this.addStories(this.props.data);
    	}
  	},

  	error: function() {
  		this.setPaginate(-1);
  	},
    render: function() {
		return (
			<div className="inside cf">
				<ul className="protips-grid cf">
					{this.state.stories}
				</ul>
				{this.state.paginate}
			</div>
		);
    }

  });


  provide('Stories', Stories);

})(_provide, _require);

