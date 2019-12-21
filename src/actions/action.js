export function setData(data, name) {
	return dispatch => {
		switch(name) {
			case 'USERDATA' : 
				dispatch({
					type : "ADD_USER_DATA",
					data : data
				})
			break;
			case 'REPOSITORIES' : 
				dispatch({
					type : "ADD_REPOSITORIES",
					data : data
				})
			break;
		}
	}
}