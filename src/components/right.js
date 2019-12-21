import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setData } from "../actions/action";
import Repolist from "./repolist";
import Header from "./header";
import axios from "axios";

class Right extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repositories : [],
			filteredRepos : []
		}
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {
		axios.get('https://api.github.com/users/supreetsingh247/repos').then(resp => {
			let requiredData = resp.data,
				output = [];
			let len = requiredData.length;
			for (var i=0; i<len; i++) {
				output.push({
					repoName : requiredData[i].name,
					description : requiredData[i].description,
					language : requiredData[i].language,
					updated : requiredData[i].updated_at,
					fork : requiredData[i].fork
				})
			}

			this.setState({
				repositories : output
			})

			this.props.setData(output, 'REPOSITORIES');
		})
	}

	onSearch = (e) => {
		let target = e.target;
		let value = target.value;
		let repos = this.state.repositories;

		let filteredRepos = repos.filter(repo => {
			return repo.repoName.toLowerCase().indexOf(value.toLowerCase()) > -1;
		})

		this.setState({
			filteredRepos: filteredRepos
		})
	}

	onSelect = (param) => {
		let value = param.target.value;
		let repos = this.state.repositories;

		let filteredRepos = (value == 'allType') || (value == 'allLanguages') ? repos : repos.filter(repo => {
			if (value == 'forks') {
				return repo.fork == true;
			}
			else {
				return repo.language == value; 
			}
		})

		this.setState({
			filteredRepos: filteredRepos
		})

	}

	render () {
		let state = this.state,
			props = this.props,
			repositories = state.filteredRepos.length ? state.filteredRepos : props.repositories;
		return (
			<div className="content-right">
				<Header totalRepos={state.repositories.length}/>
				<div className="search">
					<input type="text" placeholder="search by repository..." onChange={this.onSearch}/>
					<select onChange={this.onSelect}>
						<option selected disabled>Type</option>
						<option value='allType'>All</option>
						<option value='forks'>Forks</option>
					</select>
					<select onChange={this.onSelect}>
						<option selected disabled>Language</option>
						<option value='allLanguages'>All</option>
						<option value='HTML'>HTML</option>
						<option value='javaScript'>Javascript</option>
						<option value='CSS'>CSS</option>
					</select>
				</div>
				<div>
				{ repositories.length ?
					repositories.map((repo, index) => {
						return <Repolist
							key={index}
							repoName={repo.repoName}
							description={repo.description}
							language={repo.language}
							updated={repo.updated}
						/>
					}) : null
				}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		repositories : state.repositories
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
	setData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Right)