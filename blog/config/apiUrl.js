let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl+'getArticleList/',
    getArticleById: ipUrl+'getArticleById/', //详情页 接口
    getTypeInfo: ipUrl+'getTypeInfo/', //获得文章类别
    getListById: ipUrl+'getListById/' //获得类别ID获得文章列表
}

export default servicePath