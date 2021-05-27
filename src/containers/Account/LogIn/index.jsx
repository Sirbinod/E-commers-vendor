import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useAuth0 } from "../../../shared/components/auth/withAuth0";
import Loading from "../../../shared/components/Loading";
import LogInForm from "../../../shared/components/loginForm/LogInForm";

const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;

// const Login = () => {
const Login = () => {
  const { loginWithRedirect, loading } = useAuth0();
  if (loading) {
    return <Loading loading={loading} />;
  }
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
