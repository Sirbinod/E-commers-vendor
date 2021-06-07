import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, ButtonToolbar} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import CurrencyUsdIcon from "mdi-react/CurrencyUsdIcon";
import TagIcon from "mdi-react/TagIcon";
import {useDispatch, useSelector, connect} from "react-redux";
import renderDropZoneMultipleField from "../../../../shared/components/form/DropZoneMultiple";
import renderSelectField from "../../../../shared/components/form/Select";
import {getcategorystart} from "../../../../redux/actions/categoryActions";
import {addproduct} from "../../../../redux/actions/itemActions";
import renderDropZoneField from "../../../../shared/components/form/DropZone";
import CKEditor from "ckeditor4-react";
import Input from "../../../../shared/components/form/Input";
import validate from "./validation";

const ProductAddForm = ({handleSubmit, reset}) => {
  const dispatch = useDispatch();
  let data = [];
  const {done, catas, listCategory} = useSelector((state) => state.catas);
  const [fileBase64String, setFileBase64String] = useState("");
  const [subCategory, setSubcategory] = useState([]);
  const [childCategory, setChildcategory] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [showInfo, setShowInfo] = useState("");
  const [showchildInfo, setShowchildInfo] = useState("");
  const [descr, setDescr] = useState("");
  const [config, setconfig] = useState({loading: false, error: null});

  useEffect(() => {
    if (!listCategory) {
      alert(listCategory);
      // api call
      dispatch(getcategorystart());
    }
  });
  // setShowInfo(0);
  // if (listCategory && catas.length !== 0) {
  catas.map((cata) => {
    data.push({
      value: cata._id,
      label: cata.name,
    });
  });
  // }

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        // console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };
  const onEditorChange = (evt) => {
    setDescr(evt.editor.getData());
  };
  const Productadder = async (data) => {
    // const desc = data.myeditor;

    const file = data.image[0];
    encodeFileBase64(file);
    const nd = fileBase64String.split(";base64,");
    const imagess = nd[1];

    const file2 = data.gallery;
    const arr2 = [];
    file2.map((file22) => {
      encodeFileBase64(file22);
      const nd = fileBase64String.split(";base64,");
      arr2.push(nd[1]);
    });

    if (!imagess == "" && arr2 != []) {
      const token = localStorage.getItem("token");

      const tosenddata = {
        name: data.name,
        shortname: data.shortname,
        sku: data.sku,
        price: data.price,
        mainCategory: data.mainCategory.value,
        subCategory: data.subCategory ? data.subCategory.value : "",
        childCategory: data.childCategory ? data.childCategory.value : "",
        discount: data.discount,
        stock: parseInt(data.stock),
        brand: data.brand,
        image: imagess,
        gallery: arr2,
        tags: data.tags,
        description: descr,
      };
      try {
        setconfig({
          ...config,
          loading: true,
        });
        const response = await addproduct(token, tosenddata);
        if (response.data.status) {
        } else {
          setconfig({
            ...config,
            loading: false,
            error: response.data.message,
          });
        }
      } catch (err) {
        setconfig({
          ...config,

          loading: false,
          error: err.toString(),
        });
      }
    }
  };
  const chkdchild = (data) => {
    const reqtem2 = subdata.filter((cata) => cata._id === data);
    const subArray2 = [];
    if (reqtem2[0].children.length > 0) {
      setShowchildInfo(1);
      const subData2 = reqtem2[0].children;
      subData2.map((s1) => {
        subArray2.push({
          value: s1._id,
          label: s1.name,
        });
      });
    } else {
      setShowchildInfo(0);
    }
    setChildcategory(subArray2);
  };
  const chkchild = (data) => {
    const reqtem = catas.filter((cata) => cata._id === data);
    const subArray = [];
    if (reqtem[0].children.length > 0) {
      setShowInfo(1);
      const subData = reqtem[0].children;
      setSubdata(subData);
      subData.map((s1) => {
        subArray.push({
          value: s1._id,
          label: s1.name,
        });
      });
    } else {
      setShowInfo(0);
      setShowchildInfo(0);
    }
    setSubcategory(subArray);
  };

  const descriptionField = ({
    name,

    onChange,
    meta: {touched, error},
  }) => {
    console.log(error);
    return (
      <>
        <div className="col-md-12">
          <CKEditor name={name} onChange={onEditorChange} />
        </div>

        {touched && error && (
          <span
            style={{
              marginTop: "100px",
            }}
            className="form__form-group-error"
          >
            {error}
          </span>
        )}
      </>
    );
  };

  return (
    <form className="form product-add" onSubmit={handleSubmit(Productadder)}>
      <div className="form__half">
        <div className="form__form-group">
          <span className="form__form-group-label">Product Name</span>
          <Field name={"name"} component={Input} />
        </div>
        <div className="form__form-group-id-category">
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">SKU</span>
            <Field name={"sku"} component={Input} />
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Short Name</span>
            <Field name={"shortname"} component={Input} />
          </div>
        </div>
        <div className="form__form-group-price-discount">
          <div className="form__form-group form__form-group-price">
            <span className="form__form-group-label">Price</span>
            <Field name={"price"} component={Input}>
              <div className="form__form-group-icon">
                <CurrencyUsdIcon />
              </div>
            </Field>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Brand</span>
            <Field name={"brand"} component={Input} />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Category</span>
          <div className="form__form-group-field">
            <Field
              name="mainCategory"
              component={renderSelectField}
              type="text"
              options={data}
              onChange={(e) => chkchild(e.value)}
            />
          </div>
        </div>
        <div
          className="form__form-group"
          style={{display: showInfo === 1 ? "block" : "none"}}
        >
          <span className="form__form-group-label">Sub Category</span>
          <div className="form__form-group-field">
            <Field
              name="subCategory"
              component={renderSelectField}
              type="text"
              options={subCategory}
              value={descr}
              onChange={(e) => chkdchild(e.value)}
            />
          </div>
        </div>
        <div
          className="form__form-group"
          style={{display: showchildInfo === 1 ? "block" : "none"}}
        >
          <span className="form__form-group-label">Child Category</span>
          <div className="form__form-group-field">
            <Field
              name="childCategory"
              component={renderSelectField}
              type="text"
              options={childCategory}
              value=""
            />
          </div>
        </div>

        <div className="form__form-group-price-discount">
          <div className="form__form-group form__form-group-price">
            <span className="form__form-group-label">Stock</span>
            <Field name={"stock"} component={Input} />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Discount</span>
            <Field
              name={"discount"}
              className="form__form-group-price"
              component={Input}
            >
              <div className="form__form-group-icon">
                <TagIcon />
              </div>
            </Field>
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Tags</span>
          <Field
            name={"tags"}
            className="form__form-group-price"
            component={Input}
          />
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
      <div className="row col-md-12">
        <div className="form__form-group">
          <span className="form__form-group-label">Description</span>

          <CKEditor name="myeditor" onChange={onEditorChange} />
          {!descr && (
            <span className="form__form-group-error">
              Description is required
            </span>
          )}
        </div>
      </div>
      <div className="row col-md-12">
        <div className="form__form-group">
          <span className="form__form-group-label">Gallery</span>
          <div className="form__form-group-field">
            <Field name="gallery" component={renderDropZoneMultipleField} />
          </div>
        </div>
      </div>
      <div></div>
      <br />
      <span className="form__form-group-error">{config.error}</span>
      <ButtonToolbar className="form__button-toolbar">
        <Button
          disabled={config.loading}
          color="primary"
          type={!descr ? "button" : "submit"}
        >
          {config.loading ? "Loading..." : "Save"}
        </Button>
        <Button type="button" onClick={reset}>
          Cancel
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default connect()(
  reduxForm({
    form: "product_add_form", // a unique identifier for this form
    validate: validate,
  })(ProductAddForm)
);
