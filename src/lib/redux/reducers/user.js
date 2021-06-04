export function user(state = {current: null, error: null}, {type, payload}) {
    switch (type) {
        case 'LOGIN': 
            return payload
        case "LOGOUT":
            return payload;
        case "ERROR_AUTHENTICATION":
            return payload
        case "UPDATE_USER_PROFILE":
            return {
                ...state,
                current: {
                    ...state.current,
                    ...payload.details
                }
            }
        default:return state
    }
}

export function handleLogin(user) {
    return {
        type: "LOGIN",
        payload: {current: user, error: null}
    }
}

export function handleLogout() {
    return {
        type: "LOGOUT",
        payload: {current: null, error: null}
    }
}

export function handleErrors(err) {
    return {
        type: "ERROR_AUTHENTICATION",
        payload: {current: null, error: err}
    }
}

export function updateUserProfile(details) {
    return {
        type: "UPDATE_USER_PROFILE",
        payload: {details}
    }
}