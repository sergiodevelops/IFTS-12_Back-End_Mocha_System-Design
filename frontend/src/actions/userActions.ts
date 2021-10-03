const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS',
    }
}

const logoutSuccess = () => {
    return {
        type: 'SIGN_OUT_SUCCESS',
    }
}

export default { loginSuccess, logoutSuccess };
