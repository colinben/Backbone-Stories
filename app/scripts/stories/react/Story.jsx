/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React');

  var Story = React.createClass({
    render: function() {
    	var overlay = '',
    		data = this.props.data,
    		tags = '';
	  	if (this.props.popup) {
	  		overlay = <div className="dark-screen"></div>;
	  	}
	  	if (data.tags) {
	  		tags = data.tags.map(function(item) {
	  			return (
	  				<li>
                        <a href={"#tags/" + item}>{item}</a>
                    </li>
	  			)
	  		});
	  	}
		return (
			<div id="x-active-preview-pane">
				{overlay}
			    <div className="inside cf x-protip-pane">
			        <div id="x-protip" className="cf fullpage protip-single tip-container x-protip-content">
			            <aside className="tip-sidebar">
			                <div className="user-box">
			                    <a href={'#user/' + data.reference.user_id} className="avatar">
			                    	<img src={data.audit.author.thumbnail} />
			                    </a>
			                    <ul className="user-team">
			                        <li className="user">
			                            by &nbsp;
			                            <a href={'#user/' + data.reference.user_id} className="track">
			                            	{data.audit.author.name}
			                            </a>
			                        </li>
			                    </ul>
			                </div>
			            </aside>
			            <article id={data._id} className="tip-panel">
			                <a target="new" data-from="protip" data-action="share protip" className="share-this-tip direction track" href="#">Share this</a>
			                <a rel="nofollow" className="upvote track" href="#">{data.audit.likes}</a>
			                <header className="tip-header">
			                    <h1 className="tip-title">
			                        {data.content.title}
			                    </h1>
			                    <p className="views">
			                        <span>
			                        {data.audit.views}
			                        </span>
			                        &nbsp;
			                        views
			                    </p>
			                    <ul id="tags" className="cf">
			                        {tags}
			                    </ul>
			                </header>
			                <div className="tip-content">
			                    <p>{data.content.body_text}</p>
			                </div>
			            </article>
			        </div>
			    </div>
			</div>
		);
    }

  });


  provide('Story', Story);

})(_provide, _require);

