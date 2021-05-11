import React, { useState } from 'react';
import {
  Card, CardBody, Col, ButtonToolbar,
} from 'reactstrap';
import HeartIcon from 'mdi-react/HeartIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import images from './imgs';
import ProductTabs from './ProductTabs';
import ColorSelect from './ColorSelect';
import BadgeData from './BadgeTags';

const ProductCard = (item) => {
  const [color, setColor] = useState('white');
console.log(item.items)
  const onLike = () => {
    if (color === 'white') {
      setColor('#70bbfd');
    } else {
      setColor('white');
    }
  };
  const imggallery = [];
  item.items.gallery.map(gallimg => {
    imggallery.push({
      src: "https://haatbazaar.herokuapp.com/"+gallimg
    })
    
    
  });
  let price2 = 0;
  // const Tags  = () => {
    const tagg = item.items.tags
    const tarr = tagg.split(',');
  //   // tarr.map(tarr2 => {
      
    //   // })
     const nessItems = tarr.map(item => <badge class="badge badge-primary badge-md" style={{ marginLeft: '.5rem' }}>{item}</badge>     ); 
  // }
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="product-card">
            <ProductGallery images={imggallery} />
            <div className="product-card__info">
              <h3 className="product-card__title">{item.items.name}</h3>
              <div className="product-card__rate">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
                <a className="product-card__link" href="/easydev/e-commerce/product_page">See all reviews</a>
              </div>
              {item.items.discount>0?price2=(item.items.price-(item.items.price*item.items.discount)/100):price2=item.items.price}
              <h1 className="product-card__price">Rs.{price2} <span className="product-card__old-price">Rs.{price2}</span></h1>
              <p className="typography-message">
                SKU: {item.items.sku}
              </p>

              {nessItems}

              
              <form className="form product-card__form">
                <div className="form__form-group">
                  <span className="form__form-group-label product-card__form-label">Select Color</span>
                  <div className="form__form-group-field">
                    <ColorSelect options={[
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                    ]}
                    />
                  </div>
                </div>
               
              </form>
              <ProductTabs details="item.items" delivery="item.delivery" />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
