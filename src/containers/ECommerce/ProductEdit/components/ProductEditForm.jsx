import {Button, ButtonToolbar, Form, FormGroup, Input} from "reactstrap";
import CurrencyUsdIcon from "mdi-react/CurrencyUsdIcon";
import TagIcon from "mdi-react/TagIcon";
import RenderDropZoneMultipleField from "../../../../shared/components/form/DropZoneMultiple";
import react, {useEffect, useState, useCallback} from "react";
import Dropzone, {useDropzone} from "react-dropzone";
import {useParams} from "react-router";
import {updateProduct} from "../../../../redux/actions/itemActions";
import {getcategorystart} from "../../../../redux/actions/categoryActions";

import RenderDropZoneField from "../../../../shared/components/form/DropZone";
import CKEditor from "ckeditor4-react";
import {useDispatch, useSelector} from "react-redux";

let ProductEditForm = ({}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const {done, catas} = useSelector((state) => state.catas);
  const [fileBase64String, setFileBase64String] = useState("");

  const [subCategory, setSubcategory] = useState([]);
  const [childCategory, setChildcategory] = useState([]);
  const [showInfo, setShowInfo] = useState("");
  const [showchildInfo, setShowchildInfo] = useState("");
  const [descr, setDescr] = useState("");
  const [config, setconfig] = useState({loading: false, error: null});

  const {id} = useParams();
  const {items} = useSelector((state) => state.items);
  let filteredProduct = items.filter((item) => item._id === id)[0];

  const [product, setProduct] = useState({
    name: filteredProduct.name,
    sku: filteredProduct.sku,
    shortname: filteredProduct.shortname,
    price: filteredProduct.price,
    brand: filteredProduct.brand,
    mainCategory: filteredProduct.mainCategory,
    subCategory: filteredProduct.subCategory,
    childCategory: filteredProduct.childCategory,
    stock: filteredProduct.stock,
    discount: filteredProduct.discount,
    tags: filteredProduct.tags,
    image: filteredProduct.image,
    description: filteredProduct.description,
    gallery: filteredProduct.gallery,
  });

  let name, value;
  const handelInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProduct({...product, [name]: value});
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!done && catas.length === 0) {
      // api call
      dispatch(getcategorystart());
    }
  });

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
  const updateData = async (e) => {
    const file = product.image[0];
    encodeFileBase64(file);
    const nd = fileBase64String.split(";base64,");
    const imagess = nd[1];

    const file2 = product.gallery;
    const arr2 = [];
    file2.map((file22) => {
      encodeFileBase64(file22);
      const nd = fileBase64String.split(";base64,");
      arr2.push(nd[1]);
    });
    if (!imagess == "" && arr2 != []) {
      const data = {
        name: product.name,
        shortname: product.shortname,
        sku: product.sku,
        price: product.price,
        mainCategory: product.mainCategory.value,
        subCategory: product.subCategory ? product.subCategory.value : "",
        childCategory: product.childCategory
          ? product.childCategory.value
          : null,
        discount: product.discount,
        stock: parseInt(product.stock),
        brand: product.brand,
        image: imagess,
        gallery: arr2,
        tags: product.tags,
        description: descr,
        publish: false,
      };
      try {
        const token = localStorage.getItem("token");
        const req = await updateProduct(token, data);
        if (req.success == true) {
          dispatch(updateProduct(req.data.data));
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <Form className="form product-add" onSubmit={updateData}>
        <div className="form__half">
          <FormGroup className="form__form-group">
            <span className="form__form-group-label">Product Name</span>
            {/* {console.log("here", filteredProduct.name)} */}
            <Input
              name="name"
              type="text"
              value={product.name}
              onChange={handelInput}
            />
          </FormGroup>
          <div className="form__form-group-id-category">
            <FormGroup className="form__form-group form__form-group-id">
              <span className="form__form-group-label">SKU</span>
              <Input
                // defaultValue={filteredProduct.sku}
                name={"sku"}
                value={product.sku}
                onChange={handelInput}
              />
            </FormGroup>
            <FormGroup className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Short Name</span>
              <Input
                // defaultValue={filteredProduct.shortname}
                name={"shortname"}
                value={product.shortname}
                onChange={handelInput}
              />
            </FormGroup>
          </div>
          <div className="form__form-group-price-discount">
            <FormGroup className="form__form-group form__form-group-price">
              <span className="form__form-group-label">Price</span>
              <Input
                // defaultValue={filteredProduct.price}
                name={"price"}
                value={product.price}
                onChange={handelInput}
              >
                <div className="form__form-group-icon">
                  <CurrencyUsdIcon />
                </div>
              </Input>
            </FormGroup>
            <FormGroup className="form__form-group">
              <span
                // defaultValue={filteredProduct.brand}
                className="form__form-group-label"
              >
                Brand
              </span>
              <Input
                name={"brand"}
                value={product.brand}
                onChange={handelInput}
              />
            </FormGroup>
          </div>
          <FormGroup className="form__form-group">
            <span className="form__form-group-label">Category</span>
            <div className="form__form-group-field">
              <Input
                type="select"
                name="mainCategory"
                value={product.mainCategory}
                onChange={(e) => {
                  const filteredCate = catas.filter(
                    (x) => x._id == e.target.value
                  )[0].children;

                  console.log(filteredCate);
                  setSubcategory(filteredCate);
                  setProduct({...product, mainCategory: e.target.value});

                  if (filteredCate.length > 0) {
                    setShowInfo(1);
                    console.log("what is the");
                  }
                }}
              >
                <option></option>
                {catas.map((cat) => (
                  <option value={cat._id}>{cat.name}</option>
                ))}
              </Input>
            </div>
          </FormGroup>
          <FormGroup
            className="form__form-group"
            style={{display: showInfo === 1 ? "block" : "none"}}
          >
            <span className="form__form-group-label">Sub Category</span>
            <div className="form__form-group-field">
              <Input
                name="subCategory"
                type="select"
                value={product.subCategory}
                onChange={(e) => {
                  const newCat = subCategory.filter(
                    (x) => x._id == subCategory.id
                  );
                  if (newCat.children) {
                    setChildcategory(newCat.children);
                    setShowchildInfo(1);
                  }
                  setProduct({...product, subCategory: e.target.value});
                }}
              >
                {subCategory &&
                  subCategory.map((subCata) => (
                    <option value={subCata._id}>{subCata.name}</option>
                  ))}
              </Input>
            </div>
          </FormGroup>
          <FormGroup
            className="form__form-group"
            style={{display: showchildInfo === 1 ? "block" : "none"}}
          >
            <span className="form__form-group-label">Child Category</span>
            <div className="form__form-group-field">
              <Input name="childCategory" type="select" value="">
                {childCategory.map((childCata) => (
                  <option>childCata.name</option>
                ))}
              </Input>
            </div>
          </FormGroup>

          <div className="form__form-group-price-discount">
            <FormGroup className="form__form-group form__form-group-price">
              <span className="form__form-group-label">Stock</span>
              <Input
                // defaultValue={filteredProduct.stock}
                name={"stock"}
                value={product.stock}
                onChange={handelInput}
              />
            </FormGroup>
            <FormGroup className="form__form-group">
              <span className="form__form-group-label">Discount</span>
              <Input
                // defaultValue={filteredProduct.discount}
                name={"discount"}
                className="form__form-group-price"
                value={product.discount}
                onChange={handelInput}
              >
                <div className="form__form-group-icon">
                  <TagIcon />
                </div>
              </Input>
            </FormGroup>
          </div>

          <FormGroup className="form__form-group">
            <span className="form__form-group-label">Tags</span>
            <Input
              // defaultValue={filteredProduct.tags}
              name={"tags"}
              className="form__form-group-price"
              value={product.tags}
              onChange={handelInput}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <div className="form__form-group" style={{height: "10%"}}>
            <span className="form__form-group-label">Image</span>
            <div className="form__form-group-field">
              {/* <RenderDropZoneField name={"image"} value={product.image} /> */}
            </div>
          </div>
        </div>
        <div className="row col-md-12">
          <FormGroup className="form__form-group">
            <span className="form__form-group-label">Description</span>

            <CKEditor
              name="myeditor"
              onChange={(onEditorChange, handelInput)}
              value={product.sku}
            />
            {!descr && (
              <span className="form__form-group-error">
                Description is required
              </span>
            )}
          </FormGroup>
        </div>
        <div className="row col-md-12">
          <FormGroup className="form__form-group">
            <span className="form__form-group-label">Gallery</span>
            <div className="form__form-group-field">
              <div className="dropzone dropzone--multiple">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </div>
            </div>
          </FormGroup>
        </div>

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
          <Button type="button">Cancel</Button>
        </ButtonToolbar>
      </Form>
    </>
  );
};

export default ProductEditForm;
