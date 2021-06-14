import React, {useState} from "react";
import {Button, ButtonToolbar} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import validate from "./validation";
import renderDropZoneField from "../../../../shared/components/form/DropZone";
import Input from "../../../../shared/components/form/Input";
import {profileUpdate, updateSuccess} from "../../../../redux/actions/profile";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router";
import {useEffect} from "react";

const ProfileUpdateForm = ({handleSubmit, reset}) => {
  const dispatch = useDispatch();
  const [config, setconfig] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL.split(";base64,")[1]);
      };
    });
  };
  const profileupdate = async (e) => {
    try {
      setconfig({
        ...config,
        loading: true,
      });
      getBase64(e.image[0]).then(async (imageString) => {
        console.log(imageString);
        const token = localStorage.getItem("token");
        const updata = {
          name: e.name,
          phone: e.phone,
          address: e.address,
          description: e.description,
          profilePicture: imageString,
        };
        const response = await profileUpdate(updata, token);

        if (response.data.success) {
          dispatch(updateSuccess(updata));
          setconfig({
            ...config,
            loading: false,
            error: null,
            success: true,
          });
          <Redirect to="/account/profile" />;
        } else {
          setconfig({
            ...config,
            loading: false,
            error: response.data.message,
            success: false,
          });
        }
      });
    } catch (error) {
      setconfig({
        ...config,

        loading: false,
        error: error.toString(),
        success: false,
      });
    }
  };

  return (
    <>
      <form className="form product-add" onSubmit={handleSubmit(profileupdate)}>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">Name</span>
            <Field name="name" component={Input} />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Phone</span>
            <Field name="phone" component={Input} />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Address</span>
            <Field name="address" component={Input} />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Description</span>
            <Field name="description" component={Input} />
          </div>
        </div>
        <div className="form__half">
          <div className="form__form-group" style={{height: "10%"}}>
            <span className="form__form-group-label">Image</span>
            <div className="form__form-group-field">
              <Field name="image" component={renderDropZoneField} />
            </div>
          </div>
        </div>
        <span className="form__form-group-error">{config.error}</span>
        <ButtonToolbar className="form__button-toolbar">
          <Button disabled={config.loading} color="primary" type={"submit"}>
            {config.loading ? "Loading..." : "Save"}
          </Button>
          <Button type="button" onClick={reset}>
            Cancel
          </Button>
        </ButtonToolbar>
      </form>
    </>
  );
};

export default reduxForm({
  validate: validate,
  form: "profile-update",
})(ProfileUpdateForm);
