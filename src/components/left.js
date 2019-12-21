import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setData } from "../actions/action";
import axios from "axios";

class Left extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData : []
		}
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {
		axios.get('https://api.github.com/users/supreetsingh247').then(resp => {
			let requiredData = resp.data;//JSON.parse(JSON.stringify(resp.data));
			let resultObj = {
					name : requiredData.name,
					profilePic : './image/gurpritPic.jpg',
					userId : requiredData.login,
					bio : requiredData.bio,
					company : requiredData.company,
					location : requiredData.location,
					email : requiredData.email
				};

			this.setState({
				userData : resultObj
			})

			this.props.setData(resultObj, 'USERDATA');
		})
	}
	
	render () {
		let state = this.state,
			props = this.props,
			pic = props.userData.profilePic,
			name = props.userData.name,// ? state.userData.name ? state.userData.name : '' : '';
			userId = props.userData.userId,
			bio = props.userData.bio,
			company = props.userData.company,
			location = props.userData.location,
			email = props.userData.email ? props.userData.email : 'supreetsingh.247@gmail.com';
		return (
			<div className="content-left">
				<div className="profile-pic">
					<img src={pic}></img>
				</div>
				<div className="profile-info">
					<div className="profile-name">{name}</div>
					<div className="profile-userId">{userId}</div>
				</div>
				<span>{bio}</span>
				<div className="profile-follow">
					Follow
				</div>
				<ul className="profile-other-info">
					<li><img src="./image/company.png"/>{company}</li>
					<li><img src="./image/location.png"/>{location}</li>
					<li><img src="./image/email.png"/>{email}</li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData : state.userData
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
	setData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Left)