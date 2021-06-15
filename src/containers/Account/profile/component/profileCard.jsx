import React, {useState, useEffect} from "react";
import EyeIcon from "mdi-react/EyeIcon";

import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonToolbar,
} from "reactstrap";
import inputField from "./input";
import {Field, reduxForm, Form} from "redux-form";
import validate from "../../../../shared/components/validation/validation";
import {passwordchangeapi} from "../../../../utils/baseApi/baseapi";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {profileFetch} from "../../../../redux/actions/profile";

const ProfileCard = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {buttonLabel, className, handleSubmit, reset} = props;
  const [modal, setModal] = useState(false);
  const [config, setconfig] = useState({loading: false, error: null});
  const {loading, success, error, data, profileData} = useSelector(
    (state) => state.profile
  );

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!profileData) {
      dispatch(profileFetch(token));
    }
  }, [token, dispatch, profileData]);

  const updatData = async (e) => {
    try {
      setconfig({
        ...config,
        loading: true,
      });
      const token = localStorage.getItem("token");
      console.log(token, "token");
      const oldPassword = e.oldPassword;
      const newPassword = e.newPassword;
      const confirmNewPassword = e.confirmNewPassword;
      const response = await axios.post(
        passwordchangeapi,
        {oldPassword, newPassword, confirmNewPassword},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response");

      if (response.data.success) {
        setconfig({
          ...config,
          loading: false,
          error: null,
        });
        setModal(false);
        alert("suceessfull change password");
      } else {
        setconfig({
          ...config,
          loading: false,
          error: response.data.message,
        });
        console.log(response.data.message, "else");
      }
    } catch (error) {
      setconfig({
        ...config,

        loading: false,
        error: error.toString(),
      });
      console.log(error, "catch");
    }
  };
  return (
    <>
      {!loading ? (
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <Row>
                <Col md={6} lg={6}>
                  <div className="image">
                    <img
                      src={data.profilePicture}
                      alt="hdhhdh"
                      className="imgg"
                    />
                  </div>
                </Col>
                <Col md={6} lg={6}>
                  <div className="profile-detail">
                    <h1 className="name">
                      Name: <span className="name-datail">{data.name}</span>
                    </h1>
                    <h2 className="other-detail">
                      Address:
                      <span className="name-datail">{data.address}</span>
                    </h2>
                    <h2 className="other-detail">
                      phone:
                      <span
                        className="name-datail "
                        style={{padding: "0 0 0 1em"}}
                      >
                        {data.phone}
                      </span>
                    </h2>
                    <p>{data.description}</p>
                  </div>
                  <Button color="info" onClick={toggle} className="mt-4">
                    Password Change
                  </Button>
                  <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Password Change</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={handleSubmit(updatData)}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Old Password
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="oldPassword"
                              component={inputField}
                              type="text"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            New Password
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="newPassword"
                              component={inputField}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                            />
                            <button
                              type="button"
                              className={`form__form-group-button${
                                showPassword ? " active" : ""
                              }`}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <EyeIcon />
                            </button>
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Confirm New Password
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="confirmNewPassword"
                              component={inputField}
                              type={showPassword ? "text" : "password"}
                              placeholder="ConfirmNewPassword"
                            />
                            <button
                              type="button"
                              className={`form__form-group-button${
                                showPassword ? " active" : ""
                              }`}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <EyeIcon />
                            </button>
                          </div>
                        </div>

                        <span className="form__form-group-error">
                          {config.error}
                        </span>
                        <ButtonToolbar className="form__button-toolbar">
                          <Button color="primary" className="mr-1">
                            {config.loading ? "Loading..." : "Save"}
                          </Button>
                          <Button
                            color="secondary"
                            className="ml-1"
                            onClick={toggle}
                          >
                            Cancel
                          </Button>
                        </ButtonToolbar>
                      </Form>
                    </ModalBody>
                  </Modal>
                </Col>
              </Row>
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

export default reduxForm({
  validate: validate,
  form: "password_change",
})(ProfileCard);
