const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  isLoggedOut: true
};

const login = (state = initialState, action) => {
  if (action.type === "SIGN_IN") {
    return { ...state, isLoggedIn: true };
  }
  if (action.type === "SIGN_OUT") {
    return { ...state, isLoggedOut: true };
  }
  return state;
};

export default login;
