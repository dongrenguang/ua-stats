const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

function writeToFile(fileName, content) {
    const dir = path.parse(fileName).dir;
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, '');
    }

    const originContent = fs.readFileSync(fileName, {encoding: 'utf-8'});
    let newContent;
    if (originContent) {
        newContent = originContent + '\n';
    }
    else {
        newContent = '';
    }
    newContent += content;

    fs.writeFileSync(fileName, newContent, {encoding: 'utf-8'});
}

module.exports = router
    .post('/', async ctx => {
        const ua = ctx.request.body.useragent;
        const phoneType = ctx.request.body.phoneType;
        if (ua && phoneType) {
            const result = '[' + phoneType + ']    ' + ua;
            writeToFile(path.join(__dirname, '../../output/result.txt'), result);
            ctx.body = {
                code: '0',
                msg: '感谢您的参与！现在您可以关闭此页面。'
            };
        }
        else {
            ctx.body = {
                code: '1',
                msg: '请求参数错误，请检查您的输入，或稍后再试'
            };
        }
    });
