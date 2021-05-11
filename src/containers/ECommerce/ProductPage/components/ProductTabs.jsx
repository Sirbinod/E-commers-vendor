import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';

const ProductTabs = (desc, delivery) => {
  const [activeTab, setActiveTabs] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTabs(tab);
  };

  return (
    <div className="tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggle('1')}
          >
            Description
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggle('2')}
          >
            Delivery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => toggle('3')}
          >
            Refounds
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="typography-message">
        <TabPane tabId="1">
          {desc.description}
         
        </TabPane>
        <TabPane tabId="2">
          <p>{delivery.delivery}
          </p>
        </TabPane>
        <TabPane tabId="3">
          <p>asd
          </p>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProductTabs;
