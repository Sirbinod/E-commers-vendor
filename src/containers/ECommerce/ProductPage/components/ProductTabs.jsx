import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';

const ProductTabs = (details) => {
  console.log(details)
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
          {(details.details!==null)?<div dangerouslySetInnerHTML={{ __html: details.details }} />
          :<div><h6>No details data</h6><hr/></div>}
        </TabPane>
        <TabPane tabId="2">
          <h4>Delivery Option</h4>
<hr/>
          <h5>Cash on Delivery </h5>{(details.delivery.cod === true)?<span className="badge badge-success">Available</span>:<span className="badge badge-warning">Unavailable</span>}
          <hr/>
          {(details.warranty !== null)?
            <div>
              <h4>Warranty</h4><hr/>
              <h6>{details.warranty.title}</h6>
              <p>{details.warranty.description}</p>
            </div>:
            <div>
            <h6>No warranty data</h6><hr/>
          </div>
          }
        </TabPane>
        <TabPane tabId="3">
        {(details.warranty !== null)?
        <div>
          <h3>{details.refunds.title}</h3>
          <p>{details.refunds.description}</p>
        </div>:
        <div>
        <h6>No refund data</h6><hr/>
      </div>
        }
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProductTabs;
