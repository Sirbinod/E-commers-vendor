import React from "react";
import {Col, Container, Row} from "reactstrap";
import ProfileCard from "./component/profileCard";
const Profile = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Profile</h3>
        </Col>
      </Row>
      <Row>
        <ProfileCard />
      </Row>
    </Container>
  );
};

export default Profile;
