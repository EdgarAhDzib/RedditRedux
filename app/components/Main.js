import React, { Component } from 'react';
import axios from 'axios';

var Form = require("./Form");

export default class Main extends Component {
	constructor() {
		super();
		this.state={
			newTitle: "",
			content: "",
			categ: "",
			comment: ""
		}
		//Bind the setForm function to this constructor
		this.setForm=this.setForm.bind(this);

	}

	//Get the form data and use them to set the new state, with which to post the Reddit article
	setForm(form) {
		this.setState({
			newTitle: form.term,
			content: form.content,
			categ: form.categ
		});
		axios.post('/posts/austin/new/', { body: form });
	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h2><strong>Reddit!</strong></h2>
						<a href="#/"><button className="btn btn-default">Add A Feature</button></a>
					{/*Buttons to select for Austin or Houston subredditId categories*/}
						<a href="#/by-subreddit/austin"><button className="btn btn-default">Austin Features</button></a>
						<a href="#/by-subreddit/houston"><button className="btn btn-default">Houston Features</button></a>
				</div>

				<div className="row">
					{this.props.children}
					<p>&nbsp;</p>
					<Form setForm={this.setForm} />
				</div>
			</div>
		);
	}
}
