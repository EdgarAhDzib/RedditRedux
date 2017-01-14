import React, { Component } from 'react';

import axios from 'axios';
import ListItem from './ListItem';

export default class Article extends Component {
	constructor() {
		super();

		this.state = {
			currPost: [],
			comment: ""
		}
		this.handleCommChange=this.handleCommChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	addComment(info) {
		this.setState({
			comment: info.comment
		});
		//The state is changed, so it should be ready for posting via Mongoose
		axios.post('/posts/api/' + this.props.params.id, { comments: info.comment });
	}

	handleCommChange(event) {
		this.setState({ comment: event.target.value });
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		//Call the addComment function to post the comment value
		this.addComment(this.state);
		//Reset the state after the comment has been posted
		// this.setState({
		// 	comment: ""
		// });
	}

	componentDidMount() {
		axios.get('/posts/posts/' + this.props.params.id).then(posts => {
			this.setState({ currPost: posts.data });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.params.id !== nextProps.params.id) {
			axios.get('/posts/posts/' + nextProps.params.id).then(posts => {
				this.setState({ currPost: posts.data });
			});
		}
	}

	render() {
		return (
			<div>
				{this.state.currPost.map(post => <div key={post._id}>
					<h2>{post.title}</h2>
					<h4>{post.content}</h4>
					<ul>
						{post.comments.map(post => <li key={post}>{post}</li>)}
					</ul>
				</div>)}
				<h4>Add a comment!</h4>
				<form onSubmit={this.handleSubmit}>
					<textarea
					rows='5'
					cols='50'
					id='bodyinput'
					name='body'
					value={this.state.comment}
					onChange={this.handleCommChange}
					required></textarea><br/><br/>
					<button className="btn btn-primary" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}
