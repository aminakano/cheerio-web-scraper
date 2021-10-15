const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const util = require("util");
const app = express();
const url = "https://www.theguardian.com/international";
axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);

    const articles = [];
    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(util.inspect(articles, { maxArrayLength: null }));
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
