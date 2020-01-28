import { ACTIONS } from '../../properties/actions';
import { userLogin } from "../../api/Login";

export const userLoginSuccess = user => ({
  type: ACTIONS.USER_LOGIN_SUCCESS,
  user
});

export const userLoginFailed = loginErrorMsg => ({
  type: ACTIONS.USER_LOGIN_FAILED,
  loginErrorMsg
});

export const startUserLogin = (user, props) => {
  const body = {
    "email": user.email,
    "password": user.password
  }
  const loginErrorMsg = { text: '', code: '' };

  return dispatch => {
    userLogin(body).subscribe(
      response => {
        // props.history.push("/dashboard"); //Success login
        user.isAuthenticated = true;

        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("member", response.data.member);
        dispatch(userLoginSuccess(user));
      },
      error => {
        loginErrorMsg.text = error.message; // Failed login
        loginErrorMsg.code = error.code;
        return dispatch(userLoginFailed(loginErrorMsg));
      }
    );
  };
};

// export const startUserLogin = (user, props) => {
//   const loginService = new LoginService(props);
//   const loginErrorMsg = { text: '', code: '' };

//   return dispatch => {
//     loginService.login(user.email, user.password).subscribe(
//       () => {
//         // props.history.push("/dashboard"); //Success login
//         user.isAuthenticated = true;
//         dispatch(userLoginSuccess(user));
//       },
//       error => {
//         loginErrorMsg.text = error.message; // Failed login
//         loginErrorMsg.code = error.code;
//         return dispatch(userLoginFailed(loginErrorMsg));
//       }
//     );
//   };
// };
