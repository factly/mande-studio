import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './basic.css';
import routes from '../routes';
import Header from '../components/Header';

import { getOrganisation } from '../actions/organisations';
import { useDispatch, useSelector } from 'react-redux';

function BasicLayout(props) {
  const { Footer, Sider, Content } = Layout;
  const { children } = props;
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = React.useState(false);

  const selected = useSelector(({ organisations: { selected } }) => selected);

  React.useEffect(() => {
    dispatch(getOrganisation());
  }, [dispatch, selected]);

  return (
    <Layout hasSider={true}>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        theme="dark"
        trigger={null}
        width="256"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="menu-header">
          <span hidden={collapsed} className="menu-company">
            MandE
          </span>
        </div>
        <Menu theme="dark" mode="vertical" className="slider-menu">
          {routes
            .filter((route) => route.onNavigation)
            .map((route) => (
              <Menu.Item key={route.path}>
                <Link to={route.path}>
                  <route.icon />
                  <span>{route.title}</span>
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content key={selected.toString()} className="layout-content">
          {children}
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
