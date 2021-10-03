const userReducer = (state: Object = {}, action: any) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true };
        case "SIGN_OUT_SUCCESS":
            return { ...state, isAuthenticated: false };
        default: {
            return state;
        }
    }
}

export default userReducer;