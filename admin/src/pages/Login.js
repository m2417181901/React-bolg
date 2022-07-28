import React, { useState } from "react";
import 'antd/dist/antd'
import {Card, Input,Button,Spin, message} from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/css/login.css'
import servicePath from "../config/apiUrl";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Login(props) {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const Navigate = useNavigate()
    const checkLogin=()=> {
        setIsLoading(true)
        if (!username) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        } else if (!password) {
           message.error('密码不能为空') 
            return false
        }
        let dataProps = {
            username,
            password
        }

        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if(res.data.data === '登录成功') {
                    
                    localStorage.setItem('openId',res.data.openId)
                    console.log(localStorage.getItem('openId'))
                    Navigate('/adminindex/index')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )
    }
    return (
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading}>
                <Card title="JSpang blog System" bordered={true} style={{width:400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your username"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,25)'}}/>}
                        onChange={e => {setUserName(e.target.value)}}
                    />
                    <br/>  
                    <br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{color: 'rgba(0,0,0,25)'}}/>}
                        onChange={e => {setPassWord(e.target.value)}}
                    />
                    <br/>  
                    <br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>        
            </Spin>
        </div>
    )
}
export default Login;