import React from "react";
import PropTypes from "prop-types";
import Scrollbar from "react-smooth-scrollbar";
import classNames from "classnames";
import { SidebarProps } from "../../../shared/prop-types/ReducerProps";
import SidebarContent from "./SidebarContent";

const Sidebar = ({
  changeToDark,
  changeToLight,
  changeMobileSidebarVisibility,
  sidebar,
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    "sidebar--show": sidebar.show,
    "sidebar--collapse": sidebar.collapse,
  });

  return (
    <div className={sidebarClass}>
      <button
        className="sidebar__back"
        type="button"
        aria-label="change mobile sidebar visibility button"
        onClick={changeMobileSidebarVisibility}
      />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent
            onClick={() => {}}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            sidebarCollapse={sidebar.collapse}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: SidebarProps.isRequired,
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;
