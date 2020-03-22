module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");
  const Link = mongoose.model("Link");

  // 文章列表接口
  router.get("/articles/list", async (req, res) => {
    const cats = await Article.find().lean();
    // const parent = await Category.findOne({
    //   name: '文章'
    // })
    // const cats = await Category.aggregate([{
    //     $match: {
    //       parent: parent._id
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'articles', //文章集合
    //       localField: '_id',
    //       foreignField: 'categories',
    //       as: 'articlesList'
    //     }
    //   },
    // ])
    // cats.map(cat => {
    //   cat.articlesList.map(articles => {
    //     articles.categoryName = cat.name
    //     return articles
    //   })
    //   return cat
    // })
    res.send(cats);
  });

  // 最近
  router.get("/articles/recent", async (req, res) => {
    const cats = await Article.find()
      .limit(4)
      .lean();
    res.send(cats);
  });

  // 文章详情
  router.get("/articles/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).lean();
    res.send(data);
  });

  // links
  router.get("/links/list", async (req, res) => {
    const cats = await Link.find();
    res.send(cats);
  });
  app.use("/web/api", router);
};