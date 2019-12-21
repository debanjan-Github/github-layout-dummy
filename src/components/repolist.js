import React, { Component } from "react";

class Repolist extends Component {
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
		let props = this.props,
			iconStyle = (props.language == 'HTML') ? 'language-icon-html'
							: (props.language == 'JavaScript') ? 'language-icon-javascript'
							: (props.language == 'CSS') ? 'language-icon-css' : '';
		return (
			<div className="profile-repos">
				<div className="repo-name"><h3>{props.repoName}</h3></div>
				<div className="repo-description">{props.description}</div>
				{ props.language ?
					<>
						<span className={`language-icon ${iconStyle}`}></span> 
						<span className="repo-language">{props.language}</span>
					</>
					: null
				}
				<span className="repo-updated">Updated on {this.getDateInReadableFormat(props.updated)}</span>
			</div>
		)
	}
}

export default Repolist;