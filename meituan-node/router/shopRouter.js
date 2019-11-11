const express = require('express');
const router = express.Router();
const { connect } = require('../db/conn');
const { find, finds } = require('../db/find_fun');


// 获取分页数据信息
router.get('/getShopPage', async (req, res) => {
    let db = await connect();
    let result = await finds('shops', {}, db);
    res.send({
        err: 0,
        result
    });
});

module.exports = router;
