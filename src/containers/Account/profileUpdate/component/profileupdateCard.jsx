import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, Col} from "reactstrap";
import ProfileUpdateForm from "./profileupdateForm";
import {profileFetch} from "../../../../redux/actions/profile";

const ProfileupdateCard = () => {
  const {loading, success, error, data, profileData} = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!profileData) {
      dispatch(profileFetch(token));
    }
  }, [token, dispatch, profileData]);

  return (
    <>
      {!loading ? (
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <div className="card__title">
                <h5 className="bold-text">Main Information</h5>
              </div>
              <ProfileUpdateForm initialValues={data} />
            </CardBody>
          </Card>
        </Col>
      ) : (
        <div style={{padding: "5%", "margin-left": "40%"}}>
          <h6>
            <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          </h6>
        </div>
      )}
    </>
  );
};

export default ProfileupdateCard;
