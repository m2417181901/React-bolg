'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = 'hi guy';
  }

  async checkLogin() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    console.log(username, password);
    const sql = `SELECT user_name FROM admin_user WHERE user_name = '${username}' AND password = '${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async updateArticle() {
    let tempArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() {
    const sql = 'SELECT article.Id as id ,article.title as title ,article.introduce as introduce ,FROM_UNIXTIME(article.addTime, \'%Y-%m-%d %H:%i:%s\') as addTime ,article.view_count as view_count ,type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id ORDER BY article.id DESC';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
    let id = this.ctx.params.id; // 此处可以判断id
    let sql = `SELECT article.Id as id ,article.title as title ,article.introduce as introduce ,article.article_content as article_content ,FROM_UNIXTIME(article.addTime, \'%Y-%m-%d\') as addTime ,article.view_count as view_count ,type.typeName as typeName ,type.id as typeId FROM article LEFT JOIN type ON article.type_id = type.Id WHERE article.id = ${id}`;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
