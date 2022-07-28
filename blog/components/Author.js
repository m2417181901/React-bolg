import {Avatar, Divider} from 'antd'
import { GithubOutlined, WechatOutlined, WeiboCircleOutlined } from '@ant-design/icons';

const Author = () => {

    return (
        <div className='author-div comm-box'>
            <div> <Avatar size="100" src="" /></div>
            <div className='author-introduction'>
                程序员。。。。
                <Divider>社交账号</Divider>
                <GithubOutlined className='account' />
                <WechatOutlined className='account' />
                <WeiboCircleOutlined className='account' />
                
            </div>
        </div>
    )
}

export default Author