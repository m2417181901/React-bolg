import React from 'react'
import Head from 'next/head'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { FireOutlined,  CalendarOutlined, FolderOutlined } from '@ant-design/icons';
// import ReactMarkDown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'
const Detailed = (props) => {
  const renderer = new marked.Renderer()
  const tocify = new Tocify()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }


  marked.setOptions({
    renderer: renderer,
    gfm: true,
    padantic: false,
    sanitize: false,//视频渲染
    tables: true,
    breaks: true,//换行符
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)
  // console.log(props.article_content)
  return (
    <>
    <Head>
      <title>Detailed</title>
    </Head>
    <Header />
    <Row className='comm-main' type="flex" justify='center'>
    <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
      <div className='bread-div'>
        <Breadcrumb>
          <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href='/'>视频列表</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href='/'>xxx</a></Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <div className='detailed-title'>
          React 实战视频教程-技术胖Blog开发 （更新至第01集）
        </div>
        <div className='list-icon center'>
          <span><CalendarOutlined />2019-06-28</span>
          <span><FolderOutlined />视频教程</span>
          <span><FireOutlined />99999人</span>
        </div>
        <div className='detailed-content' dangerouslySetInnerHTML={{__html: html } }>

        </div>
      </div>
    </Col>
    <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
      <Author />
      <Affix offsetTop={5}>
      <div className='detailed-nav comm-box'> 
        <div className='nav-title'>文章目录</div>
        {tocify && tocify.render()}
        
        
        
        {/* <MarkNav
          className='article-menu'
          source={html}
          ordered={true} //是否有编号
        /> */}
      </div>
      </Affix>
    </Col>
    </Row>
    <Footer />
 </>
  )
}

Detailed.getInitialProps = async(context)=> {
  console.log(context.query.id)
  let id = context.query.id 

  const promise = new Promise((resolve)=> {
    axios(servicePath.getArticleById+id).then(
      res => {
        console.log('****************')
        console.log(res.data.data[0])
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed;