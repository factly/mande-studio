import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';

import Login from './pages/login';
import Registration from './pages/registration';
import BasicLayout from './layout/basic';
import Tags from './pages/tags/index';
import Memberships from './pages/memberships/index';
import Payments from './pages/payments/index';
import TagCreate from './pages/tags/create';
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
