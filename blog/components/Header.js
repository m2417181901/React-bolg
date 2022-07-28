import React, {useState, useEffect} from "react";
import {Row, Col, Menu} from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from "../config/apiUrl";
const Header = ()=> {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{//读取数据库中type中的标签 将其作为导航头
            const result = await axios(servicePath.getTypeInfo).then(
                res => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])

    const handleClick = e => {
        if(e.key==0) {
            Router.push('/')
        }else {
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo"> 技术胖</span>
                    <span className="header-txt">专注前端开发 每年100集免费视频</span>
                </Col>
                {/* </ Row> */}
            {/* <Row type="flex" justify="center"> */}
                <Col xs={24} sm={24} md={10} lg={10} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return (
                                    <Menu.Item key={item.Id}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                        <Menu.Item key="video">
                            
                            视频
                        </Menu.Item>
                        <Menu.Item key="life">
                            
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header