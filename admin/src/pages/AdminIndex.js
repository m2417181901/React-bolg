import { Layout, Menu, Breadcrumb } from 'antd';
import '../static/css/adminindex.css'
import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined
} from '@ant-design/icons';
import Addarticle from './AddArticle';
import {Routes, Route} from 'react-router-dom'
import ArcticleList from './AtrlcleList'
import { useNavigate } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Adminindex() {

    const [collapsed, setCollapsed] = useState(false)
    const Navigate = useNavigate()
 

    const onCollapse = collapsed => {
    setCollapsed(collapsed)
    };

    const handleClickArticle = e=> {
      if(e.key === 'addArticle') {
        Navigate('index/add')
      } else {
        Navigate('index/list')
      }
    }



    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
             工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} onClick={handleClickArticle} title="文章管理">
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
              
            </SubMenu>
            {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="9" icon={<FileOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/index" exact element={<Addarticle />}/> 
                <Route path="/index/add" exact element={<Addarticle />}/> 
                <Route path="/index/list" exact element={<ArcticleList />}/>
                <Route path="/index/add/:id" exact element={<Addarticle />}/>  
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MZW</Footer>
        </Layout>
      </Layout>
    );
  }

export default Adminindex