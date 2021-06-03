import React from "react";
import Notification from "rc-notification";

let notification = null;
// eslint-disable-next-line no-return-assign
Notification.newInstance({style: {top: 65}}, (n) => (notification = n));

export const showNotification = (direction, color, title, message) => {
  const notificationInitialProps = {
    content: (
      <BasicNotification
        color={color}
        title={title}
        message={message}
        // theme={theme}
      />
    ),
    closable: true,
    duration: 5,
    style: {top: 0, left: "calc(100vw - 100%)"},
    className: `right-up ${direction}-support`,
  };
  notification.notice(notificationInitialProps);
};

const BasicNotification = ({color, title, message}) => (
  <div className={`notification notification--${color}`}>
    <h5 className="notification__title bold-text">{title}</h5>
    <p className="notification__message">{message}</p>
  </div>
);
