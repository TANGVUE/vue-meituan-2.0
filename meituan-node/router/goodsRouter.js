const express = require('express');
const router = express.Router();
const { connect } = require('../db/conn');
var ObjectID = require('mongodb').ObjectID;
const { find, finds } = require('../db/find_fun');


// 获取单个商品数据
router.get('/getOneGoods', async (req, res) => {
    let { _id } = req.query;
    let db = await connect();
    let result = await find('goods', { _id: new ObjectID(_id) }, db);
    result ? res.send({
        err: 0,
        result
    }) : res.send({
        err: -1,
        mesg: '商品不存在！'
    });
})

// 获取全部商品数据
router.get('/getAllGoods', async (req, res) => {
    let { s_id } = req.query;
    let db = await connect();
    let result = await finds('goods', { s_id: new ObjectID(s_id) }, db);
    res.send({
        err: 0,
        result
    });
});




module.exports = router;