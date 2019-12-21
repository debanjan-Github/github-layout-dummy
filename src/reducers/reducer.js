const initialState = {
	userData : [],
	repositories : []
}

const reducer = (state=initialState, action) => {

	switch (action.type) {
		case "ADD_USER_DATA":
			state = {
				...state,
				userData : action.data
			}
		break;
		case "ADD_REPOSITORIES":
			state = {
				...state,
				repositories : action.data
			}
		break;
	}
	return state;
};

export default reducer;