import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, ButtonToolbar} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import CurrencyUsdIcon from "mdi-react/CurrencyUsdIcon";
import TagIcon from "mdi-react/TagIcon";
import renderDropZoneMultipleField from "../../../../shared/components/form/DropZoneMultiple";
import renderSelectField from "../../../../shared/components/form/Select";
import {connect, useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {updateProduct} from "../../../../redux/actions/itemActions";
import {getcategorystart} from "../../../../redux/actions/categoryActions";
import Input from "../../../../shared/components/form/Input";
import validate from "../../ProductAdd/components/validation";
import renderDropZoneField from "../../../../shared/components/form/DropZone";
import CKEditor from "ckeditor4-react";

let ProductEditForm = ({handleSubmit, reset}) => {
  let data = [];
  const {done, catas} = useSelector((state) => state.catas);
  const [fileBase64String, setFileBase64String] = useState("");
  const [subCategory, setSubcategory] = useState([]);
  const [childCategory, setChildcategory] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [showInfo, setShowInfo] = useState("");
  const [showchildInfo, setShowchildInfo] = useState("");
  const [descr, setDescr] = useState("");
  const [config, setconfig] = useState({loading: false, error: null});
  // const {id} = useParams();
  // const {items} = useSelector((state) => state.items);
  // let filteredProduct = items.filter((item) => item._id === id)[0];
  // console.log(filteredProduct);

  // console.log(filteredProduct);
  // const [product, setProduct] = useState({...filteredProduct}); // aba esma value aauxa yai valuelai update garne
  const dispatch = useDispatch();

  useEffect(() => {
    if (!done && catas.length === 0) {
      // api call
      dispatch(getcategorystart());
    }
  });
  // setShowInfo(0);
  if (done && catas.length !== 0) {
    catas.map((cata) => {
      data.push({
        value: cata._id,
        label: cata.name,
      });
    });
  }

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
    console.log("here");
    setDescr(evt.editor.getData());
  };
  const updateData = async (info) => {
    const file = info.image[0];
    encodeFileBase64(file);
    const nd = fileBase64String.split(";base64,");
    const imagess = nd[1];

    const file2 = info.gallery;
    const arr2 = [];
    file2.map((file22) => {
      encodeFileBase64(file22);
      const nd = fileBase64String.split(";base64,");
      arr2.push(nd[1]);
    });
    if (!imagess == "" && arr2 != []) {
      const data = {
        name: info.name,
        shortname: info.shortname,
        sku: info.sku,
        price: info.price,
        mainCategory: info.mainCategory._id,
        subCategory: info.subCategory ? info.subCategory : "",
        childCategory: info.childCategory ? info.childCategory : "",
        discount: info.discount,
        stock: parseInt(info.stock),
        brand: info.brand,
        image: imagess,
        gallery: arr2,
        tags: info.tags,
        description: descr,
        publish: "",
      };
      try {
        const id = info._id;
        const token = localStorage.getItem("token");
        const req = await updateProduct(token, data, id);
        console.log(req);
        if (req.success == true) {
          dispatch(updateProduct(req.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const chkdchild = (data) => {
    console.log(subdata);
    console.log(data);
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
      // console.log(subArray)
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
      // console.log(subArray)
    } else {
      setShowInfo(0);
      setShowchildInfo(0);
    }
    setSubcategory(subArray);
  };

  return (
    <>
      <form className="form product-add" onSubmit={handleSubmit(updateData)}>
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
      </form>{" "}
    </>
  );
};

// ProductEditForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   reset: PropTypes.func.isRequired,
// };

ProductEditForm = reduxForm({
  form: "product_edit_form",
  validate: validate,
})(ProductEditForm);

// const ProductEditForm2 = connect((state) => ({
//   initialValues: {
//     ...state.items.items.filter((item) => item._id === useParams().id)[0],
//   },
// }))(ProductEditForm1)
export default ProductEditForm;
// export default reduxForm({
//   form: "product_edit_form",
//   // a unique identifier for this form
//   initialValues: connect((state) => {
//     const value = state.items.filter((item) => item._id === useParams().id)[0];
//     console.log(value);
//     return value;
//   }),
// })(ProductEditForm);
