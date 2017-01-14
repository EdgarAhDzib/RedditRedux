// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function() {
		return {
			term: "",
			content: "",
			categ: ""
			};
	},

	// This function will modify the Title field from the user input
	handleTermChange: function(event) {
		this.setState({ term: event.target.value });
	},

	// This function will modify the Content field from the user input
	handleContentChange: function(event) {
		this.setState({ content: event.target.value });
	},

	// This function will modify the Category field from the user input
	handleCategChange: function(event) {
		this.setState({ categ: event.target.value });
	},

	// When a user submits...
	handleSubmit: function(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of
		// clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.setForm(this.state);
		this.setState({
			term: "",
			content: "",
			categ: ""
		});
	},
	
	// Here we describe this component's render method
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Add A Feature!</h3>
				</div>
				<div className="panel-body text-center">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<h4 className="">
								<strong>Title</strong>
							</h4>

							{/*Each onChange event is associated its respective handle(param)Change event.*/}
							<input
								value={this.state.term}
								type="text"
								className="form-control text-center"
								id="term"
								onChange={this.handleTermChange}
								required
							/>
							<br />
														<h4 className="">
								<strong>Content</strong>
							</h4>
							<input
								value={this.state.content}
								type="text"
								className="form-control text-center"
								id="content"
								onChange={this.handleContentChange}
								required
							/>
							<br />
														<h4 className="">
								<strong>Category</strong>
							</h4>
							<select
								value={this.state.categ}
								type="select"
								className="form-control text-center"
								id="categ"
								onChange={this.handleCategChange}
								required
							>
								<option value="Austin">Austin</option>
								<option value="Houston">Houston</option>
							</select>

							<br />
							<button
								className="btn btn-primary"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

// Export the component back for use in other files
module.exports = Form;