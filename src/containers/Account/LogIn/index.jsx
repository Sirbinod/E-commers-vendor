import React from "react";
import Loading from "../../../shared/components/Loading";
import LogInForm from "../../../shared/components/loginForm/LogInForm";

// const Login = () => {
const Login = () => {
  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to
              <span className="account__logo">
                {" "}
                TRAVEL
                <span className="account__logo-accent"> RIGHT</span>
              </span>
            </h3>
          </div>
          <LogInForm onSubmit form="log_in_form" />
        </div>
      </div>
    </div>
  );
};

export default Login;
