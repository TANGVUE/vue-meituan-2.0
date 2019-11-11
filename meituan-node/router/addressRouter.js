const express = require('express');
const router = express.Router();
// 引入数据库相关操作
const { connect } = require('../db/conn');
const { insert } = require('../db/insert_fun');
const { finds } = require('../db/find_fun');



// 获取用户相关地址信息
router.get('/getAddress', async (req, res) => {
    let { u_id } = req.query;
    console.log(u_id);
    let db = await connect();
    let result = await finds('address', { u_id }, db);
    result ? res.send({
        err: 0,
        result
    }) : res.send({
        err: -1,
        mesg: '该用户没有地址信息'
    })
});

// 插入单个地址信息
router.post('/saveAddress', async (req, res) => {
    let address = req.body;
    console.log(address);
    let db = await connect();
    let result = await insert('address', address, db);
    result ? res.send({
        err: 0,
        mesg: '地址保存成功'
    }) : res.send({
        err: -1,
        mesg: '地址保存失败'
    });
});

module.exports = router;