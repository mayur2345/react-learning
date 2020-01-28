import React, { useReducer } from "react";

const types = {
    UPDATE_NEW_PASSWORD: 0,
    UPDATE_CONFIRM_PASSWORD: 1,
    UPDATE_FORM: 2,
    PASSWORD_MISMATCH: 3,
    LOADING_STATE: 4
}

const resetPasswordReducer = (state, action) => {
    switch (action.type) {
        case types.UPDATE_NEW_PASSWORD: {
            return {
                ...state,
                newPassword: action.newPassword
            }
        }
        case types.UPDATE_CONFIRM_PASSWORD: {
            return {
                ...state,
                confirmNewPassword: action.confirmNewPassword
            }
        }
        case types.UPDATE_FORM: {
            return {
                ...state,
                newPasswordValid: action.newPasswordValid,
                confirmNewPasswordValid: action.confirmNewPasswordValid,
                formValid: action.formValid,
                errorMessage: action.errorMessage
            }
        }
        case types.PASSWORD_MISMATCH: {
            return {
                ...state,
                errorMessage: action.errorMessage,
                confirming: action.confirming
            }
        }
        case types.LOADING_STATE: {
            return {
                ...state,
                confirming: action.confirming
            }
        }
        default:
            return state;
    }
}

const ResetPassword = props => {
    const initialState = {
        confirming: false,
        errorMessage: '',
        newPassword: '',
        confirmNewPassword: '',
        formValid: false,
        newPasswordValid: false,
        confirmNewPasswordValid: false
    };
    const [state, dispatch] = useReducer(resetPasswordReducer, initialState);

    const onChange = e => {
        const { name } = e.target;
        const { value } = e.target;
        switch (e.target.name) {
            case 'newPassword': {
                dispatch({
                    type: types.UPDATE_NEW_PASSWORD,
                    newPassword: value
                });
                validateField(name, value);
                break;
            }
            case 'confirmNewPassword': {
                dispatch({
                    type: types.UPDATE_CONFIRM_PASSWORD,
                    confirmNewPassword: value
                });
                validateField(name, value);
                break;
            }
            default:
                break;
        }
    };

    const validateField = (fieldName, value) => {
        let { newPasswordValid, confirmNewPasswordValid, errorMessage } = state;
        switch (fieldName) {
            case 'newPassword': {
                newPasswordValid = value.length >= 6;
                errorMessage = newPasswordValid ? '' : 'Password is too short';
                break;
            }
            case 'confirmNewPassword': {
                confirmNewPasswordValid = value.length >= 6;
                errorMessage = confirmNewPasswordValid ? '' : 'Confirm password is too short';
                break;
            }
            default:
                break;
        }

        dispatch({
            type: types.UPDATE_FORM,
            errorMessage: errorMessage,
            newPasswordValid: newPasswordValid,
            confirmNewPasswordValid: confirmNewPasswordValid,
            formValid: newPasswordValid && confirmNewPasswordValid
        });
    };

    const updatePassword = e => {
        e.preventDefault();
        const { newPassword, confirmNewPassword } = state;

        dispatch({
            type: types.LOADING_STATE, confirming: true
        });
        if (newPassword !== confirmNewPassword) {
            console.log("Password Update Failed!!");
            dispatch({
                type: types.PASSWORD_MISMATCH,
                errorMessage: "Password doesn't match",
                confirming: false
            });
        } else {
            console.log("Password Updated!!");
            dispatch({
                type: types.LOADING_STATE,
                confirming: false
            });
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 paddingLeft55PX paddingRight55PX paddingTop65PX paddingBottom54PX">
                    <div className="login100-form validate-form">
                        <span className="login100-form-title paddingBottom49PX">
                            <img className="logo_img" alt=""></img>
                        </span>

                        <form onSubmit={updatePassword}>
                            <div
                                className="wrap-input100 validate-input marginBottom23PX"
                                data-validate="field is reauired">
                                <span className="label-input100">New Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="newPassword"
                                    value={state.newPassword}
                                    onChange={onChange}
                                    placeholder="New Password"
                                />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>

                            <div
                                className="wrap-input100 validate-input"
                                data-validate="field is required">
                                <span className="label-input100">Confirm New Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="confirmNewPassword"
                                    value={state.confirmNewPassword}
                                    onChange={onChange}
                                    placeholder="Confirm New password" />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>
                            {state.confirming ? <p>Confirming...</p> : null}
                            <p className="text-danger">{state.errorMessage}</p>

                            <div className="container-login100-form-btn marginTop40PX">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button
                                        disabled={!state.formValid}
                                        className="login100-form-btn"
                                        type="submit">
                                        Done
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;