var React = require('react');
var $ = require('jquery');

var ChatList = React.createClass({

	propTypes: {
		url: React.PropTypes.string.isRequired
	},

getInitialState: function() {
	return {
		chats: []
	};
},

getChats: function() {
	$.ajax({
		url: this.props.url,
		type: 'GET',
		beforeSend: function(request) {
			request.setRequestHeader('X-Parse-Application-Id', 'jakP3cioNiIPcGNuC4j8t28eAKib0pEBMTrn3cKl');
			request.setRequestHeader('X-Parse-REST-API-Key', 'yrekghrK3Asd9JhiOIuTmBbmTRf4hEqO7XygyJp5');
			request.setRequestHeader('Content-Type', 'application/json');
		},
		error: function(data) {
			console.log('error getting chats');
		},
		success: function(data) {
			console.log('Success gettting chats');
			if (this.isMounted()) {
				this.setState({
					chats: data.results
					});
				}	
		}.bind(this)
	})
},

componentDidMount: function() {
	this.interval = setInterval(function() {
		this.getChats();

	}.bind(this), 1000)
},

componentWillUnmount: function() {
    clearInterval(this.interval);
  },  

  render: function(){

  	var list = this.state.chats.map (function(item, index) {
  		return <li className="list-group-item" key={item.objectId}> 
  				{item.text} </li>
  	});

    return (
      <ul className="list-group">
      	{list}
      </ul>
    )
  }
});

module.exports = ChatList;