
import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux"
import { publicRequest } from "../lib/requestMethod";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(loginFailure());
        alert(err.response.data.message + "Or try SIGN IN with Google");
    }
}

export const loggingOut = async (dispatch) => {
    dispatch(logOut());
}