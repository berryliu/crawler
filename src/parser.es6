/**
 * Created by berry on 16/5/13.
 * Web Content Parser
 */
'use strict';

const cheerio = require('cheerio');

/**
 * @desc parse html
 * @param content
 */
function parser(content) {
    if (!content) {
        throw new Error('[Error] No content need to be parsed.');
    }

    let $ = cheerio.load(content);

    return $('.cell.item').map((i, e) => {
        let $e = $(e);
        let $title = $e.find('.item_title a');
        let $type =  $e.find('.node');
        let $user = $e.find('.small strong').eq(0).find('a');

        return {
            title: $title.text(),
            titleLink: $title.attr('href').split('#')[0],
            type: $type.text(),
            typeLink: $type.attr('href'),
            user: $user.text(),
            userLink: $user.attr('href'),
            floor: $e.find('.count_livid').text() || 0
        }
    }).get();
}

module.exports = parser;
