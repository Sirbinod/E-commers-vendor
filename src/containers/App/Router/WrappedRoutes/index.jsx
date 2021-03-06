import React from "react";
import { Route } from "react-router-dom";
import ECommerceDashboard from "../../../ECommerce/dashboard/dashboard";
import Layout from "../../../Layout/index";
import Account from "./Account";
import ECommerce from "./ECommerce";

export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/account" component={Account} />
      <Route path="/e-commerce" component={ECommerce} />
      <Route path="/" exact component={ECommerceDashboard} />
    </div>
  </div>
);
