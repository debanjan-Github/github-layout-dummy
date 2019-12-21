import React, { Component } from "react";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}

	}

	getDateInReadableFormat = (value) => {
		let dateOriginal = new Date(value);

		let month = dateOriginal.toLocaleString('default', { month: 'long' });
		let date = dateOriginal.getDate();
		let year = dateOriginal.getFullYear();

		return [month, `${date},`, year].join(' ');
	}

	render() {
		let props = this.props;
			
		return (
			<div className="profile-header">
				<div className="tablink">Overview</div>
				<div className="tablink tablink-selected">Repositories<span>{props.totalRepos}</span></div>
				<div className="tablink">Projects<span>{0}</span></div>
				<div className="tablink">Stars<span>{7}</span></div>
				<div className="tablink">Followers<span>{3}</span></div>
				<div className="tablink">Following<span>{2}</span></div>
			</div>
		)
	}
}

export default Header;