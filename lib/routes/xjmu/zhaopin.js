const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const baseUrl = 'https://job.xjmu.edu.cn';
    const listUrl = `${baseUrl}/Zhaopin/zhaopinList.html`;

    const response = await got(listUrl);
    const $ = cheerio.load(response.data);

    const list = $('ul.news-list li')
        .map((_, item) => {
            const el = $(item);
            const link = baseUrl + el.find('a').attr('href');
            const title = el.find('a').text().trim();
            const date = el.find('span').text().trim();
            return {
                title,
                link,
                pubDate: parseDate(date, 'YYYY-MM-DD'),
            };
        })
        .get();

    ctx.state.data = {
        title: '新疆医科大学 - 招聘信息',
        link: listUrl,
        item: list,
    };
};
