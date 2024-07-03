import { useEffect, useState } from 'react';
import { loginUser, clearLoginError } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

export const LoginPage = () => {
  const [userData, setUserData] = useState({
    username: { value: '', isValid: null },
    password: { value: '', isValid: null },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const loginErr = useSelector((state) => state.user.loginErr);

  const dispatch = useDispatch();
  const { username, password } = userData;

  useEffect(() => {
    let shouldDisable = false;
    for (const value of Object.values(userData)) {
      if (!value.isValid) {
        shouldDisable = true;
        break;
      }
    }
    setIsDisabled(shouldDisable);
  }, [userData]);

  const validateField = (fieldName, fieldValue) => {
    return fieldValue.length > 0;
  };

  const validateForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(loginUser({ username: username.value, password: password.value }));
  };

  const onFormChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: {
        value: e.target.value,
        isValid: validateField(e.target.id, e.target.value),
      },
    }));
  };

  const clearError = () => {
    dispatch(clearLoginError());
  };

  return (
    <div className="login-page">
      <h3>Welcome to Chat Application</h3>
      <form className="reg-user p-3" onSubmit={validateForm}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              username.isValid === false && 'is-invalid'
            }`}
            id="username"
            value={username.value}
            onChange={onFormChange}
          />
          <div className="invalid-feedback">Please enter a username.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className={`form-control ${
              password.isValid === false && 'is-invalid'
            }`}
            id="password"
            value={password.value}
            onChange={onFormChange}
          />
          <div className="invalid-feedback">Please enter a password.</div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={isDisabled}>
          Log in
        </button>
      </form>
      {loginErr && (
        <div className="alert alert-danger" role="alert">
          {loginErr}
          <button
            type="button"
            className="btn-close"
            onClick={clearError}
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};
