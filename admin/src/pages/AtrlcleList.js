import React, {useState, useEffect} from "react";
import {List, Row, Col, Modal, message, Button, Space} from 'antd'
import axios from "axios";
import servicePath from "../config/apiUrl";
import { IeOutlined, UserAddOutlined } from "@ant-design/icons";
import '../static/css/articleList.css'
import { useNavigate } from "react-router-dom";
const { confirm } = Modal

function ArticleList(props) {
  const [articleList, setList] = useState([])
  const Navigate = useNavigate()
  const getList=()=> {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(
      res=> {
        setList(res.data.list)
      }
    )
  }

  const delArticle = (id) => {
      confirm({
          title: '确定要删除这篇博客吗',
          content: '如果点击ok按钮 文章将会被删除。',
          onOk(){
              axios(servicePath.delArticle + id, {withCredentials: true}).then(
                res => {
                  message.success('文章删除成功')
                  getList()
                }
              )      
          },
          onCancel(){
              message.success('文章没有变化')
          }
      })
  }
  // 修改文章跳转方法
  const updateArticle = id => {
      Navigate(`/adminIndex/index/add/${id}`)
  }

  useEffect(()=> {
    getList()
  }, [])
  
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>  
            </Col>  
            <Col span={4}>
              <b>类别</b>  
            </Col>  
            <Col span={4}>
              <b>发布时间</b>  
            </Col>  
            <Col span={4}>
              <b>浏览量</b>  
            </Col>  
            <Col span={4}>
              <b>操作</b>  
            </Col>  
          </Row>
        }
        bordered
        dataSource={articleList}
        renderItem={item=> (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
                1233  
              </Col>  
              <Col span={4}>
                {item.typeName}  
              </Col>  
              <Col span={4}>
                {item.addTime}  
              </Col>  
              <Col span={4}>
                {item.view_count}  
              </Col>  
              <Col span={4}>
                <Space>
                  <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>
                  <Button onClick={()=>{delArticle(item.id)}}>删除</Button>
                </Space>
              </Col>
            </Row>
          </List.Item>
        )}
        />
    </div>
  )

}

export default ArticleList;