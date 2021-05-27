import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { useDispatch, useSelector } from "react-redux";
// import { getuserstart } from '@/redux/actions/loginActions';
const SidebarContent = ({ onClick, sidebarCollapse }) => {
  const hideSidebar = () => {
    onClick();
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink
          title="Dashboard"
          icon="store"
          route="/e_commerce_dashboard"
          onClick={hideSidebar}
        />
      </ul>

      <ul className="sidebar__block">
        <SidebarCategory
          title="Products"
          icon="cart"
          sidebarCollapse={sidebarCollapse}
        >
          <SidebarLink
            title="Add Product"
            route="/e-commerce/product_add"
            onClick={hideSidebar}
          />
          {/* <SidebarLink title="Single Product" route="/e-commerce/product_page" onClick={hideSidebar} /> */}
          <SidebarLink
            title="Products"
            route="/e-commerce/products_list"
            onClick={hideSidebar}
          />
        </SidebarCategory>
        {/* <SidebarCategory title="My Account" icon="user" isNew sidebarCollapse={sidebarCollapse}>
          <SidebarLink title="Lock Screen" route="/lock_screen" />
          <SidebarLink title="My Profile" route="/account/profile" onClick={hideSidebar} />
        </SidebarCategory> */}
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory
          title="Orders"
          icon="list"
          sidebarCollapse={sidebarCollapse}
        >
          <SidebarLink
            title="View Orders"
            route="/e-commerce/orders_list"
            onClick={hideSidebar}
          />
        </SidebarCategory>
      </ul>

      <ul className="sidebar__block">
        <SidebarLink
          title="Log Out"
          icon="exit"
          onClick={logout}
          route="/log_in"
        />
      </ul>
    </div>
  );
};

SidebarContent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  changeToDark: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  sidebarCollapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  sidebarCollapse: false,
};

export default SidebarContent;
