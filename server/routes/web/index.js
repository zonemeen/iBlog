module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Link = mongoose.model("Link");

  // 文章列表
  router.get("/articles/list", async (req, res) => {
    const cats = await Article.find();
    res.send(cats);
  });

  // 最近
  router.get("/articles/recent", async (req, res) => {
    const cats = await Article.find()
      .limit(4)
      .lean();
    res.send(cats);
  });

  // 获取指定页码的文章
  router.get('/articles/:pageNum', async (req, res) => {
    const currentPage = req.params.pageNum;
    const list = await Article.find().sort({
      'createdAt': -1
    }).skip((currentPage - 1) * 6).limit(6).populate('categories')
    const count = await Article.find().lean().count()
    const totalPage = Math.ceil(count / 6)
    res.send({
      list,
      totalArticles: count,
      totalPage,
      currentPage
    })
  })

  // 文章详情
  router.get("/articles/list/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).populate('categories');
    res.send(data);
  });

  // links
  router.get("/links/list", async (req, res) => {
    const cats = await Link.find();
    res.send(cats);
  });
  app.use("/web/api", router);
};