let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码
  getTypeInfo: ipUrl + 'getTypeInfo', // 得到文章总类型
  addArticle: ipUrl + 'addArticle', // 插入数据
  updateArticle: ipUrl + 'updateArticle', //修改文章内容
  getArticleList: ipUrl + 'getArticleList', // 文章列表
  delArticle: ipUrl + 'delArticle/', //删除文章
  getArticleById: ipUrl + 'getArticleById/', // 根据id获得文章详情
}

export default servicePath