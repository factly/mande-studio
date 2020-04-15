import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import "antd/dist/antd.css";

import BasicLayout from "./layout/basic";
import Login from "./pages/login";
import Products from "./pages/products/index";
import ProductCreate from "./pages/products/create";
import ProductDetail from "./pages/products/details";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/auth/login" component={Login} />
        <BasicLayout>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/products/create" component={ProductCreate} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </BasicLayout>
      </Router>
    </div>
  );
}

export default App;
