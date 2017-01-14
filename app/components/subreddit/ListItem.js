import React, { Component } from 'react';

export default class ListItem extends Component {
	render() {
		return (
			<li>
				<h2><a href={"#/posts/" + this.props.post._id}>{this.props.post.title}</a></h2>
			</li>
		);
	}
}
