import React, { useState } from 'react';
import { NavLink,Outlet } from 'react-router-dom';
import {
  SelectOutlined,
  ShopOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon,path, children) {
  return {
    key,
    icon,
    path,
    children,
    label,
  };
}
const items = [
  getItem('Kategoriler', '1', <SelectOutlined />,'/kategori'),
  getItem('Ürünler', '2', <ShopOutlined />,'/urunler'),
  getItem('Alışveriş Listesi', '3', <UnorderedListOutlined />,'/alısveris-listesi'),
];
const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
           
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item ></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
    
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
             
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Umut Akkemik
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Nav;