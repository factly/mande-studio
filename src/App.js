import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';

import BasicLayout from './layout/basic';
import Tags from './pages/tags/index';
import Memberships from './pages/memberships/index';
import Payments from './pages/payments/index';
import TagCreate from './pages/tags/create';
import Plans from './pages/plans/index';
import PlanCreate from './pages/plans/create';
import Login from './pages/login';
import Registration from './pages/registration';

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
          </BasicLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
