const express = require('express');
const router = express.Router();

// 引入数据库相关操作
const { connect } = require('../db/conn');
const { insert } = require('../db/insert_fun');
const { find } = require('../db/find_fun');


// 获取用户购物车数据
router.get('/getCart', async (req, res) => {

});

// 


module.exports = router;
