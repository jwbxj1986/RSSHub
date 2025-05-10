const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://job.xjmu.edu.cn/Zhaopin/zhaopinList.html';

    const res = await got(url);
    const $ = cheerio.load(res.data);

    ctx.body = `
        <h1>抓取成功</h1>
        <p>页面标题: ${$('title').text()}</p>
        <p>岗位条目数量: ${$('ul.news-list li').length}</p>
        <hr>
        <p>以下是原始 HTML 部分内容（安全起见省略）</p>
        <pre>${res.data.slice(0, 1000)}</pre>
    `;
};
