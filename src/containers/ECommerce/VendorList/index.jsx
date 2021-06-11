import React from 'react';

import { Container, Col, Row } from 'reactstrap';
import VendorListTable from './components/VendorListTable';
import CreateTableData from './components/CreateData';




const VendorList = () => {

  const vendorListTableData = CreateTableData();
    
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Vendor List</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
            information
          </h3>
        </Col>
      </Row>
      <Row>
        <VendorListTable vendorListTableData={vendorListTableData}/>
      </Row>
    </Container>
  );
};

export default VendorList;
