import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PATH from '../../properties/paths';
import { startUserLogin } from '../../store/actions/loginActions';
import '../../scss/Login.scss';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const types = {
    LOADING_STATE: 0,
    UPDATE_FORM: 1,
    DATA_FETCHED: 2,
    UPDATE_EMAIL: 3,
    UPDATE_PASSWORD: 4
}

const loginReducer = (state, action) => {
    switch (action.type) {
        case types.LOADING_STATE: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case types.UPDATE_FORM: {
            return {
                ...state,
                emailValid: action.emailValid,
                passwordValid: action.passwordValid,
                formValid: action.formValid,
                errorMessage: action.errorMessage
            }
        }
        case types.DATA_FETCHED: {
            return {
                ...state,
                loading: action.loading,
                errorMessage: action.errorMessage
            }
        }
        case types.UPDATE_EMAIL: {
            return {
                ...state,
                email: action.email,
            }
        }
        case types.UPDATE_PASSWORD: {
            return {
                ...state,
                password: action.password,
            }
        }
        default:
            return state;
    }
}

const Login = (props) => {
    useEffect(() => {
        dispatch({ type: types.DATA_FETCHED, loading: false, errorMessage: props.loginErrorMsg.text });

        if (props.user.isAuthenticated === true) {
            localStorage.setItem('isAuthenticated', 'true');
            props.history.push(PATH.clients);
        }
    }, [props]);

    const initialState = {
        loading: false,
        errorMessage: '',
        email: '',
        password: '',
        formValid: false,
        emailValid: false,
        passwordValid: false
    };
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const loginUser = e => {
        e.preventDefault();
        const { startUserLogin } = props;
        dispatch({ type: types.LOADING_STATE, loading: true });
        const user = {
            email: state.email,
            password: state.password,
            isAuthenticated: false,
        };
        startUserLogin(user, props);
    };

    const onChange = e => {
        const { name } = e.target;
        const { value } = e.target;
        switch (e.target.name) {
            case 'email': {
                dispatch({
                    type: types.UPDATE_EMAIL,
                    email: value
                });
                validateField(name, value);
                break;
            }
            case 'password': {
                dispatch({
                    type: types.UPDATE_PASSWORD,
                    password: value
                });
                validateField(name, value);
                break;
            }
            default:
        }
    };

    const validateField = (fieldName, value) => {
        let { emailValid, passwordValid, errorMessage } = state;
        switch (fieldName) {
            case 'email': {
                emailValid = EMAIL_REGEX.test(value.toLowerCase());
                errorMessage = emailValid ? '' : 'Email is invalid';
                break;
            }
            case 'password': {
                passwordValid = value.length >= 6;
                errorMessage = passwordValid ? '' : 'Password is too short';
                break;
            }
            default:
                break;
        }

        dispatch({
            type: types.UPDATE_FORM,
            errorMessage: errorMessage,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: emailValid && passwordValid
        });
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 paddingLeft55PX paddingRight55PX paddingTop65PX paddingBottom54PX">
                    <div className="login100-form validate-form">
                        <span className="login100-form-title paddingBottom49PX">
                            <img className="logo_img" alt="" />
                        </span>

                        <form onSubmit={loginUser}>
                            <div
                                className="wrap-input100 validate-input marginBottom23PX"
                                data-validate="Email is required">
                                <span className="label-input100">Email</span>
                                <input
                                    className="input100"
                                    type="email"
                                    name="email"
                                    placeholder="Type your Email"
                                    onChange={onChange}
                                    value={state.email} />
                                <span className="focus-input100" data-symbol="&#xf206;" />
                            </div>

                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Type your password"
                                    onChange={onChange}
                                    value={state.password}
                                />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>
                            {state.loading ? <p>Logging in...</p> : null}
                            <p className="text-danger">{state.errorMessage}</p>
                            <div className="reset">
                                <Link to="/reset-password">Forgot password?</Link>
                            </div>
                            <div className="container-login100-form-btn marginTop40PX">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button
                                        className="login100-form-btn"
                                        type="submit"
                                        disabled={!state.formValid}>
                                        Login
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

const mapStateToProps = state => ({
    user: state.loginState.user,
    loginErrorMsg: state.loginState.loginErrorMsg
});

const mapDispatchToProps = dispatch => ({
    startUserLogin: bindActionCreators(startUserLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);