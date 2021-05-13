import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
import TagIcon from 'mdi-react/TagIcon';
import { useDispatch, useSelector } from 'react-redux';
import renderDropZoneMultipleField from '@/shared/components/form/DropZoneMultiple';
import renderSelectField from '@/shared/components/form/Select';
import { getcategorystart } from '@/redux/actions/categoryActions';
import { addproduct } from '@/redux/actions/itemActions';
import renderDropZoneField from '@/shared/components/form/DropZone';
import CKEditor from 'ckeditor4-react';

const ProductAddForm = ({ handleSubmit, reset }) => {
  const dispatch = useDispatch();
let data = [];
    const {done,catas, loading} = useSelector(state=>state.catas);
      const [fileBase64String, setFileBase64String] = useState("");
      const [subCategory, setSubcategory] = useState([]);
      const [childCategory, setChildcategory] = useState([]);
      const [subdata, setSubdata] = useState([]);
      const [showInfo, setShowInfo] = useState("");
      const [showchildInfo, setShowchildInfo] = useState("");
      const [descr, setDescr] = useState("");
    useEffect(() => {
      if(!done && catas.length === 0 ){
  
        // api call  
          dispatch(getcategorystart())
      }
    })
    // setShowInfo(0);
      if(done && catas.length !== 0){
      catas.map(cata => {
        data.push({
            value: cata._id, 
            label: cata.name 
        });
      })
    }
  
    const onSubmit = (event) => {
        // event.preventDefault();
    
        // console.log(event);
      };
      
    
     
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
      const onEditorChange = ( evt ) =>  {
        setDescr(
          evt.editor.getData()
          )
        }
        const Productadder =  (data) => {
          // const desc = data.myeditor;
        
        const file = data.image[0];
        encodeFileBase64(file);
        const nd = fileBase64String.split(';base64,');
        const imagess = nd[1];

        const file2 = data.gallery;
        const arr2 = [];
        file2.map(file22 => {
           encodeFileBase64(file22);
        const nd = fileBase64String.split(';base64,');
           arr2.push(nd[1])
        });
        
        if(!imagess == '' && arr2 != []){
        const token = localStorage.getItem('token');
       
      
        const tosenddata = {
          'name': data.name,
          'shortname': data.shortname,
          'sku': data.sku,
          'price': data.price,
          'mainCategory': data.mainCategory.value,
          'subCategory': (data.subCategory.value)?data.subCategory.value:'',
          'childCategory': (data.childCategory)?data.childCategory.value:'',
          'discount': data.discount,
          'stock': parseInt(data.stock),
          'brand': data.brand,
          'image': imagess,
          'gallery': arr2,
          'tags': data.tags,
          'description':descr
        }
        console.log(tosenddata);
        dispatch(addproduct(token, tosenddata));
        // console.log('we are here ',image1);
      }
    };
      const chkdchild = (data) => {
        console.log(subdata);
        console.log(data);
        const reqtem2 = subdata.filter(cata => cata._id === data);
        const subArray2 = [];
      if(reqtem2[0].children.length >0){
        setShowchildInfo(1)
        const subData2 = reqtem2[0].children;
        subData2.map(s1 => {
          subArray2.push({
            value: s1._id, 
            label: s1.name
          })
        })
        // console.log(subArray)
      }else{
        setShowchildInfo(0)
      }
      setChildcategory(subArray2)
      }
     const chkchild = (data) => {
       console.log(data);
       const reqtem = catas.filter(cata => cata._id === data);
       const subArray = [];
       if(reqtem[0].children.length >0){
         setShowInfo(1)
         const subData = reqtem[0].children;
         setSubdata(subData);
         subData.map(s1 => {
           subArray.push({
             value: s1._id, 
             label: s1.name
            })
          })
        // console.log(subArray)
      }else{
        setShowInfo(0)
        setShowchildInfo(0)
      }
      setSubcategory(subArray)
      
    }
  
    return (
      
      <form className="form product-add" onSubmit={handleSubmit(Productadder)}>
    <div className="form__half">
      <div className="form__form-group">
        <span className="form__form-group-label">Product Name</span>
        <div className="form__form-group-field">
          <Field
            name="name"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group-id-category">
        <div className="form__form-group form__form-group-id">
          <span className="form__form-group-label">SKU</span>
          <div className="form__form-group-field">
            <Field
              name="sku"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div className="form__form-group form__form-group-id">
          <span className="form__form-group-label">Short Name</span>
          <div className="form__form-group-field">
            <Field
              name="shortname"
              component="input"
              type="text"
            />
          </div>
        </div>
       
      </div>
      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Price</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <CurrencyUsdIcon />
            </div>
            <Field
              name="price"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Brand</span>
          <div className="form__form-group-field">
            
            <Field
              name="brand"
              component="input"
              type="text"
            />
          </div>
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
      <div className="form__form-group" style={{ display: showInfo === 1 ? "block" : "none" }}>
      <span className="form__form-group-label">Sub Category</span>
          <div className="form__form-group-field">

            <Field
              name="subCategory"
              component={renderSelectField}
              type="text"
              options={subCategory}
              onChange={(e) => chkdchild(e.value)}
            />
          </div>
      </div>
      <div className="form__form-group"style={{ display: showchildInfo === 1 ? "block" : "none" }}>
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
          <div className="form__form-group-field">
          
            <Field
              name="stock"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Discount</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <TagIcon />
            </div>
            <Field
              name="discount"
              component="input"
              type="text"
            />
          </div>
        </div>
      </div>
     


      <div className="form__form-group">
        <span className="form__form-group-label">Tags</span>
        <div className="form__form-group-field">
          <Field
            name="tags"
            component="input"
            type="text"
          />
        </div>
      </div>
      
    </div>
    <div className="form__half">
      <div className="form__form-group" style={{height:'10%'}}>
        <span className="form__form-group-label">Image</span>
        <div className="form__form-group-field">
        <Field
              name="image"
              component={renderDropZoneField}
            />
        </div>
      </div>
   
      
      
    </div>
    <div className="row col-md-12">
    <div className="form__form-group">
      <span className="form__form-group-label">Description</span>
      <div className="col-md-12">
      {/* write ckeditor code */}
      <CKEditor
    name="myeditor"
    onChange={onEditorChange}
/>
      </div>
      </div>
    </div>
    <div className="row col-md-12">
    <div className="form__form-group">
        <span className="form__form-group-label">Gallery</span>
        <div className="form__form-group-field">
          <Field
            name="gallery"
            component={renderDropZoneMultipleField}
            />
        </div>
      </div>
    </div>
    <div>
    
    </div>
    <br/>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit">Save</Button>
      <Button type="button" onClick={reset}>Cancel</Button>
    </ButtonToolbar>
  </form>
)};

ProductAddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(ProductAddForm);
