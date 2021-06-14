import React, {useState} from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import {Collapse} from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import {useSelector} from "react-redux";

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = ({auth0, user}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleProfile = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  let userimg = "";
  let username = "";
  const {id, loggedIn} = useSelector((state) => state.login);
  if (loggedIn === true) {
    userimg =
      "https://cdn2.iconfinder.com/data/icons/various-people-avatars-solid/128/salesman_vendor_dealer_vender_marketeer_monger_business-man_broker_-512.png";
    username = "Vendor";
  } else {
    window.location.href = "/";
  }

  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={toggleProfile}>
        <img className="topbar__avatar-img" src={userimg} alt="avatar" />
        <p className="topbar__avatar-name">{username}</p>
        <DownIcon className="topbar__icon" />
      </button>
      {isCollapsed && (
        <button
          className="topbar__back"
          type="button"
          aria-label="profile button"
          onClick={toggleProfile}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink
            title="My Profile"
            icon="user"
            path="/account/profile"
            onClick={toggleProfile}
          />

          <div className="topbar__menu-divider" />
          <TopbarMenuLink
            title="Account Settings"
            icon="cog"
            path="/account/profile"
            onClick={toggleProfile}
          />
          <TopbarMenuLink
            title="Profile Update"
            icon="undo"
            path="/account/profilr_update"
            onClick={toggleProfile}
          />
          {}
          <TopbarMenuLink
            title="Log Out"
            icon="exit"
            path="/log_in"
            onClick={logout}
          />
        </div>
      </Collapse>
    </div>
  );
};

// TopbarProfile.propTypes = {
//   user: UserProps,
//   auth0: AuthOProps.isRequired,
// };

TopbarProfile.defaultProps = {
  user: {},
};

export default TopbarProfile;
