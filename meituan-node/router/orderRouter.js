const express = require('express');
const router = express.Router();
const { connect } = require('../db/conn');
const { insert } = require('../db/insert_fun');
const { finds } = require('../db/find_fun');


//结算价格 添加订单
router.post('/addOrder', async (req, res) => {
    function getTime() {
        let date = new Date();
        let yaer = date.getFullYear();
        let month = date.getMonth() + 1;
        let d = date.getDate();
        let hours = date.getHours();
        let min = date.getMinutes();
        return yaer + '-' + month + '-' + d + '  ' + hours + ':' + min;
    }

    let { s_id, o_price, u_id, s_imgURL, s_shopName } = req.body;
    let db = await connect();
    let result = await insert('orders', {
        s_id,
        o_price,
        u_id,
        o_orderState: 1,
        o_orderTime: getTime(),
        s_imgURL,
        s_shopName,
    }, db);
    result ? res.send({
        err: 0,
        mesg: '订单已经生成'
    }) : res.send({
        err: -1,
        mesg: '订单生成失败'
    });
});

// 获取该用户的全部订单
/*
u_id
*/
router.get('/getOrders', async (req, res) => {
    let { u_id } = req.query;
    let db = await connect();
    let result = await finds('orders', { u_id }, db);
    result ? res.send({
        err: 0,
        result
    }) : res.send({
        err: -1,
        mesg: '该用户没有订单数据'
    });
});


module.exports = router;