function AppReducer(state, action) {
    switch (action.type) {  
        case 'ADD_CALL':
            const updatedRecents = [action.payload, ...state.recents].slice(0, 10);
            return {
                ...state,
                recents: updatedRecents,
            };
        case 'SET_LOGIN_STATUS':
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case 'SET_PHONE_NUMBER':
            return {
                ...state,
                phoneNumber: action.payload,
            };
        default:
            return state;
    }
  }
  
  export default AppReducer;
  