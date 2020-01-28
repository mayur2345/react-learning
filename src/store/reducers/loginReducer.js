import { ACTIONS } from '../../properties/actions';

const loginReducerDefaultState = {
  user: {
    email: '',
    password: '',
    isAuthenticated: false
  },
  loginErrorMsg: {
    text: '',
    code: ''
  }
};

const loginReducer = (state = loginReducerDefaultState, action) => {
  switch (action.type) {
    case ACTIONS.USER_LOGIN_SUCCESS:
      state = {
        user: {
          email: action.user.email,
          password: action.user.password,
          isAuthenticated: true,
        },
        loginErrorMsg: {
          text: '',
          code: ''
        }
      };
      return { ...state, ...action };
    case ACTIONS.USER_LOGIN_FAILED:
      state = {
        user: {
          email: '',
          password: '',
          isAuthenticated: false,
        },
        loginErrorMsg: {
          text: action.loginErrorMsg.text,
          code: action.loginErrorMsg.code
        }
      };
      return { ...state, ...action };
    default:
      return state;
  }
};

export default loginReducer;
