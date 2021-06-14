import React from "react";
import {Container, Row, Col} from "reactstrap";
import ProfileupdateCard from "./component/profileupdateCard";
const ProfileUpdate = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Profile Update</h3>
        </Col>
      </Row>
      <Row>
        <ProfileupdateCard />
      </Row>
    </Container>
  );
};

export default ProfileUpdate;
