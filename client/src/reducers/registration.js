const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  isLoggedOut: false,
  userId : '',
  firstTime: false
};

export default (state = initialState, action) => {
  console.log(action)
  if (action.type === "SIGN_IN") {
    return { ...state, isLoggedIn: true, userId: action.id.user.id, firstTime: action.id.user.firstTime };
  }
  if (action.type === "SIGN_OUT") {
    return { ...state, isLoggedOut: true };
  }
  return state;
};


