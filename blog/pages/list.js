import React, {useState, useEffectffect, useEffect}from 'react'
import Head from 'next/head'
import {Row, Col, List, Breadcrumb} from 'antd'
import Header from '../components/Header'
import { TeamOutlined, DesktopOutlined, CalendarOutlined } from '@ant-design/icons';
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';
const MList = (list) => {
  
  const [myList, setMyList] = useState(
    list.data
  )
  console.log('*******(((((())))))*******', list.data)
  useEffect(()=> {
    setMyList(list.data)
  })



  return ( (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className='comm-main' type="flex" justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href='/'>视频教程</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item=>(
              <List.Item>
                <div className='list-title'>
                  <Link href={{pathname: '/detailed', query:{id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='list-icon'>
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><DesktopOutlined />{item.typeName}</span>
                  <span><TeamOutlined />{item.view_count}</span>
                </div>
                <div className='list-context'>{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          1234
          <Advert/>
        </Col>
      </Row>
      <Footer/>
    </>
  ))
}

MList.getInitialProps = async (context)=> {
  let id = context.query.id
  const promise = new Promise((resolve)=> {
    axios(servicePath.getListById+id).then(
      res => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default MList;