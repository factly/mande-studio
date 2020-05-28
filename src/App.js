import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';

import BasicLayout from './layout/basic';
import Tags from './pages/tags/index';
import TagCreate from './pages/tags/create';
import ProductCreate from './pages/products/create';
import Products from './pages/products';
import CategoryCreate from './pages/categories/create';
import Categories from './pages/categories';
import CurrencyCreate from './pages/currencies/create';
import Currencies from './pages/currencies';
import ProductTypes from './pages/product_types';
import ProductTypeCreate from './pages/product_types/create';
import ProductEdit from './pages/products/edit';
import Login from './pages/login';
import Registration from './pages/registration';
import Memberships from './pages/memberships/index';
import Payments from './pages/payments/index';
import Plans from './pages/plans/index';
import PlanCreate from './pages/plans/create';
import Orders from './pages/orders/index';
import OrderDetail from './pages/orders/detail';
import Carts from './pages/carts/index';
import CartDetail from './pages/carts/detail';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/registration" component={Registration} />
          <BasicLayout>
            <Route exact path={'/'} />
            <Route exact path={'/categories'} component={Categories} />
            <Route exact path={'/categories/create'} component={CategoryCreate} />
            <Route exact path={'/currencies'} component={Currencies} />
            <Route exact path={'/currencies/create'} component={CurrencyCreate} />
            <Route exact path={'/products'} component={Products} />
            <Route exact path={'/products/detail/:id'} component={ProductEdit} />
            <Route exact path={'/products/create'} component={ProductCreate} />
            <Route exact path={'/types'} component={ProductTypes} />
            <Route exact path={'/types/create'} component={ProductTypeCreate} />
            <Route exact path={'/tags/create'} component={TagCreate} />
            <Route exact path={'/tags'} component={Tags} />
            <Route exact path={'/plans/create'} component={PlanCreate} />
            <Route exact path={'/plans'} component={Plans} />
            <Route exact path={'/memberships'} component={Memberships} />
            <Route exact path={'/payments'} component={Payments} />
            <Route exact path={'/orders'} component={Orders} />
            <Route exact path={'/orders/:id'} component={OrderDetail} />
            <Route exact path={'/carts'} component={Carts} />
            <Route exact path={'/carts/:id'} component={CartDetail} />
          </BasicLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
