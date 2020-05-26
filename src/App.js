import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import "antd/dist/antd.css";

import BasicLayout from "./layout/basic";
import Tags from "./pages/tags/index";
import Memberships from "./pages/memberships/index";
import Payments from "./pages/payments/index";
import TagCreate from "./pages/tags/create";
import Plans from "./pages/plans/index";
import PlanCreate from "./pages/plans/create";

function App() {
  return (
    <div className="App">
      <Router>
        <BasicLayout>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"} />
            <Route exact path={process.env.PUBLIC_URL + "/tags/create"} component={TagCreate} />
            <Route exact path={process.env.PUBLIC_URL + "/tags"} component={Tags} />
            <Route exact path={process.env.PUBLIC_URL + "/plans/create"} component={PlanCreate} />
            <Route exact path={process.env.PUBLIC_URL + "/plans"} component={Plans} />
            <Route exact path={process.env.PUBLIC_URL + "/memberships"} component={Memberships} />
            <Route exact path={process.env.PUBLIC_URL + "/payments"} component={Payments} />
          </Switch>
        </BasicLayout>
      </Router>
    </div>
  );
}

export default App;
