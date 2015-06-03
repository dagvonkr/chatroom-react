var React = require('react');
var $ = require('jquery');

var AddChat = React.createClass({

	propTypes: {
		url: React.PropTypes.string.isRequired
	},
	// default:
	getDefaultProps: function() {
		return {
			url: 'https://api.parse.com/1/classes/chat'
		};
	},
	addChat: function() {
		$.ajax({
			url: this.props.url,
			type: 'POST',
			data: JSON.stringify({text: this.refs.newChatInput.getDOMNode().value}),
			beforeSend: function(request){
				request.setRequestHeader('X-Parse-Application-Id', 'jakP3cioNiIPcGNuC4j8t28eAKib0pEBMTrn3cKl');
				request.setRequestHeader('X-Parse-REST-API-Key', 'yrekghrK3Asd9JhiOIuTmBbmTRf4hEqO7XygyJp5');
				request.setRequestHeader('Content-Type', 'application/json');
			}, error: function(error) {
				console.log('Error!', error);
			}, success: function(success) {
				this.refs.newChatInput.getDOMNode().value='';
				console.log('Success!', success);
			}.bind(this)
		});
	},

	handleSubmit: function(e) {
		if(e.keyCode === 13) {
			this.addChat();
		}
	},

	render: function(){
		return (
		  <div className="form-group">
		  <input
		  	type='text'
		  	placeholder='Say something'
		  	ref='newChatInput'
		  	className='form-control'
		  	onKeyDown={this.handleSubmit} />
		  </div>
		)
	}
});

module.exports = AddChat;