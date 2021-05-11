import React from 'react';

import { Container, Col, Row } from 'reactstrap';
import UserListTable from './components/UserListTable';
import CreateTableData from './components/CreateData';




const UserList = () => {

  const userListTableData = CreateTableData();
    
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">User List</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
            information
          </h3>
        </Col>
      </Row>
      <Row>
        <UserListTable userListTableData={userListTableData}/>
      </Row>
    </Container>
  );
};

export default UserList;
