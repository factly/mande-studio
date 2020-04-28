import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import "antd/dist/antd.css";

import BasicLayout from "./layout/basic";
import Login from "./pages/login";
import Tags from "./pages/tags/index";
import TagCreate from "./pages/tags/create";
import TagDetail from "./pages/tags/details";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/auth/login" component={Login} />
        <BasicLayout>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/tags/create" component={TagCreate} />
            <Route exact path="/tags/:id" component={TagDetail} />
            <Route exact path="/tags" component={Tags} />
          </Switch>
        </BasicLayout>
      </Router>
    </div>
  );
}

export default App;
