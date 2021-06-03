import React, {useState} from "react";
import {Field, reduxForm, Form} from "redux-form";
// import axios from 'axios';
import {connect, useDispatch, useSelector} from "react-redux";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {Alert, Button} from "reactstrap";
import renderCheckBoxField from "../form/CheckBox";
import {login, loginchk, authError} from "../../../redux/actions/loginActions";
import {withTheme} from "@material-ui/core";
import validate from "../validation/validation";
import inputField from "../validation/inputField";
import {showNotification} from "../notification/notification";

const LogInForm = ({fieldUser, typeFieldUser, form, handleSubmit}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {loggedIn, loading, error} = useSelector((state) => state.login);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  const loginHandeler = async (data) => {
    try {
      const res = await login(data.email, data.password);
      if (res.data.success) {
        var id = res.data.data._id;
        var email = res.data.data.email;
        showNotification("ltr", "success", "Login Successfully", "Success");
        dispatch(loginchk(id, email, "ok"));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loginsuccess", res.data.success);
        return true;
      } else {
        showNotification("ltr", "danger", res.data.message, "Login Fail");
        return false;
      }
    } catch (error) {}
    dispatch(authError());
    showNotification("ltr", "danger", error.data.message, "Login Fail");
    return false;
  };
  return (
    <Form className="form login-form" onSubmit={handleSubmit(loginHandeler)}>
      <div className="form__form-group">
        <span className="form__form-group-label">{fieldUser}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="email"
            component={inputField}
            type={typeFieldUser}
            placeholder={fieldUser}
            className="input-without-border-radius"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field
            name="password"
            component={inputField}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-without-border-radius"
          />
          <button
            type="button"
            className={`form__form-group-button${
              showPassword ? " active" : ""
            }`}
            onClick={showPasswordToggle}
          >
            <EyeIcon />
          </button>
          <div className="account__forgot-password">
            <NavLink to="/reset_password">Forgot a password?</NavLink>
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group form__form-group-field">
          <Field
            name={`remember_me-${form}`}
            component={renderCheckBoxField}
            label="Remember me"
          />
        </div>
      </div>
      <div className="account__btns">
        {loggedIn === false && loading === false ? (
          <Button
            className="account__btn btn btn-primary"
            type="submit"
            color="primary"
          >
            Log In
          </Button>
        ) : loggedIn === true ? (
          <Button
            className="account__btn btn btn-primary"
            type="submit"
            color="primary"
            disabled
          >
            <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Logging in
          </Button>
        ) : (
          <Button
            className="account__btn btn btn-primary"
            type="submit"
            color="primary"
            disabled
          >
            <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Checking
          </Button>
        )}
      </div>
    </Form>
  );
};

LogInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorMsg: PropTypes.string,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
  form: PropTypes.string.isRequired,
};

LogInForm.defaultProps = {
  errorMessage: "",
  errorMsg: "",
  fieldUser: "Username",
  typeFieldUser: "text",
};

export default reduxForm({
  validate: validate,
  form: "login_form",
})(LogInForm);
