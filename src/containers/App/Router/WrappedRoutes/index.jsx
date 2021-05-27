import React from "react";
import { Route } from "react-router-dom";
import Layout from "../../../Layout/index";
// import Commerce from "./Commerce";
import Account from "./Account";
import ECommerce from "./ECommerce";
// import DefaultPages from "./DefaultPages";

export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      {/* <Route path="/e_commerce_dashboard" component={Commerce} /> */}
      <Route path="/account" component={Account} />
      <Route path="/e-commerce" component={ECommerce} />
      {/* <Route path="/default_pages" component={DefaultPages} /> */}
    </div>
  </div>
);
