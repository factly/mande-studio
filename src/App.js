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
import ProductStatus from './pages/statuses';
import StatusCreate from './pages/statuses/create';
import ProductTypes from './pages/product_types';
import ProductTypeCreate from './pages/product_types/create';

function App() {
  return (
    <div className="App">
      <Router>
        <BasicLayout>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} />
            <Route exact path={process.env.PUBLIC_URL + '/categories'} component={Categories} />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/categories/create'}
              component={CategoryCreate}
            />
            <Route exact path={process.env.PUBLIC_URL + '/currencies'} component={Currencies} />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/currencies/create'}
              component={CurrencyCreate}
            />
            <Route exact path={process.env.PUBLIC_URL + '/products'} component={Products} />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/products/create'}
              component={ProductCreate}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/products/status'}
              component={ProductStatus}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/products/status/create'}
              component={StatusCreate}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/products/type'}
              component={ProductTypes}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/products/type/create'}
              component={ProductTypeCreate}
            />
            <Route exact path={process.env.PUBLIC_URL + '/tags/create'} component={TagCreate} />
            <Route exact path={process.env.PUBLIC_URL + '/tags'} component={Tags} />
          </Switch>
        </BasicLayout>
      </Router>
    </div>
  );
}

export default App;
