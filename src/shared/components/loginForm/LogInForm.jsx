import React, { useState } from "react";
import { Field, reduxForm, Form } from "redux-form";
// import axios from 'axios';
import { connect, useDispatch, useSelector } from "react-redux";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
import renderCheckBoxField from "../form/CheckBox";
import { login } from "../../../redux/actions/loginActions";
import { withTheme } from "@material-ui/core";

const LogInForm = ({
  errorMessage,
  errorMsg,
  fieldUser,
  typeFieldUser,
  form,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {loggedIn, loading, error} = useSelector(state => state.login);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    console.log(event);
  };
  const dispatch = useDispatch();

  const loginHandeler = (data) => {
    dispatch(login(data.username, data.password));
  };
  return (
    
    <Form className="form login-form" onSubmit={handleSubmit(loginHandeler)}>
      <Alert color="danger" isOpen={!!errorMessage || !!errorMsg}>
        {errorMessage}
        {errorMsg}
      </Alert>
      <div className="form__form-group">
        <span className="form__form-group-label">{fieldUser}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="username"
            component="input"
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
            component="input"
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
        
          {(loggedIn===false && loading === false)?<Button
            className="account__btn btn btn-primary"
            type="submit"
            color="primary"
          >
            Log In
          </Button>
          :(loggedIn === true)?<Button
          className="account__btn btn btn-primary"
          type="submit"
          color="primary" disabled
        >
         <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Logging in
        </Button>
          :<Button
            className="account__btn btn btn-primary"
            type="submit"
            color="primary" disabled
          >
           <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Checking
          </Button>}
        
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

export default connect((state) => ({
  errorMsg: state.user.error,
}))(reduxForm()(LogInForm));
