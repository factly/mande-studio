import React from 'react';
import { Divider, Layout, Popover, List, Avatar } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import AccountMenu from './AccountMenu';
import OrganisationSelector from './OrganisationSelector';
import { useSelector } from 'react-redux';

function Header() {
  const { details } = useSelector(({organisations}) => organisations);
  return (
    <Layout.Header style={{backgroundColor: "white"}}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <OrganisationSelector />

        {details && details.applications && details.applications.length > 0 ? (
          <>
            <Divider type="vertical" />
            <Popover
              placement="bottom"
              content={
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={details.applications}
                  renderItem={(item) => (
                    <List.Item>
                      <a href={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.medium && item.medium.url ? (
                          <img alt="logo" className="menu-logo" src={item.medium.url.raw} />
                        ) : (
                          <Avatar shape="square" size={35}>
                            {item.name.charAt(0)}
                          </Avatar>
                        )}
                        <p>{item.name}</p>
                      </a>
                    </List.Item>
                  )}
                />
              }
              trigger="click"
            >
              <AppstoreOutlined />
            </Popover>
          </>
        ) : null}
        <Divider type="vertical" />
        <AccountMenu />
      </div>
    </Layout.Header>
  );
}

export default Header;
