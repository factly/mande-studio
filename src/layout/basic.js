import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, AutoComplete, Divider } from 'antd';
import './basic.css';
import logo from '../assets/logo.svg';
import routes from '../routes';

import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

function BasicLayout(props) {
  const { Header, Footer, Sider, Content } = Layout;
  const { children } = props;

  const [options, setOptions] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

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
          <img alt="logo" className="menu-logo" src={logo} />
          <span hidden={collapsed} className="menu-company">
            GO COMM
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
        <Header className="layout-header">
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Divider type="vertical" />
            <AutoComplete
              style={{ width: 300 }}
              options={options}
              onSelect={onSelect}
              onSearch={onSearch}
              placeholder="Search....."
            />
            <Divider type="vertical" />
            <a href={window.REACT_APP_KRATOS_PUBLIC_URL + '/self-service/browser/flows/logout'}>
              <Button>
                <LogoutOutlined />
                Logout
              </Button>
            </a>
          </div>
        </Header>
        <Content className="layout-content">{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
