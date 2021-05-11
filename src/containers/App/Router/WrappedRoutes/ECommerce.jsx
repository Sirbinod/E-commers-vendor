import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../../../ECommerce/Cart/index';
import Catalog from '../../../ECommerce/Catalog/index';
import OrdersList from '../../../ECommerce/OrdersList/index';
import Payment from '../../../ECommerce/Payment/index';
import ProductEdit from '../../../ECommerce/ProductEdit/index';
import ProductAdd from '../../../ECommerce/ProductAdd/index';
import ProductPage from '../../../ECommerce/ProductPage/index';
import ProductsList from '../../../ECommerce/ProductsList/index';
import UserList from '../../../ECommerce/UserList/index';
import VendorsList from '../../../ECommerce/VendorList/index';

export default () => (
  <Switch>
    <Route path="/e-commerce/cart" component={Cart} />
    <Route path="/e-commerce/catalog" component={Catalog} />
    <Route path="/e-commerce/orders_list" component={OrdersList} />
    <Route path="/e-commerce/payment" component={Payment} />
    <Route path="/e-commerce/product_edit" component={ProductEdit} />
    <Route path="/e-commerce/product_add" component={ProductAdd} />
    <Route path="/e-commerce/product_page/:id" component={ProductPage} />
    <Route path="/e-commerce/products_list" component={ProductsList} />
    <Route path="/e-commerce/users_list" component={UserList} />
    <Route path="/e-commerce/vendors_list" component={VendorsList} />
  </Switch>
);
