const router = require('koa-router')();

const home = require('./home');
const ua = require('./ua');

router.use('/', home.routes());
router.use('/ua', ua.routes());

module.exports = router;
