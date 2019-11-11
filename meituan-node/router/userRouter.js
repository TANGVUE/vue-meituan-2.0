const express = require('express');
const router = express.Router();

const { send } = require('../emil/emil_module');

// 引入数据库相关操作
const { connect } = require('../db/conn');
const { insert } = require('../db/insert_fun');
const { find } = require('../db/find_fun');

// 临时验证码存放
let smsArr = [];


// 登录
router.post('/login', (req, res) => {
    let { tel, password } = req.body;
    if (!tel || !password) {
        return res.send({
            err: -1,
            mesg: '输入信息不完整'
        });
    }
    (async () => {
        let db = await connect();
        let result = await find('users', {
            tel,
            password
        }, db);
        result ? res.send({
            err: 0,
            mesg: '登录成功',
            _id: result._id,
            username: result.username,
            tel: result.tel,
            password: result.password
        }) : res.send({
            err: -2,
            mesg: '账号密码不正确',
            result
        });
    })();

});


// 注册
router.post('/register', (req, res) => {
    let { username, password, tel, emil, sms } = req.body;
    console.log(req.body);
    (async () => {
        // 连接数据库
        let db = await connect();
        // 检测数据完整性
        if (!username || !password || !tel || !emil || !sms) {
            return res.send({
                err: -1,
                mesg: '注册信息不完整'
            });
        }
        // 检测用户名
        let next = await find('users', { tel }, db);
        if (next) {
            return res.send({
                err: -2,
                mesg: '该手机号已被占用'
            });
        }

        if (smsArr.length == 0) {
            return res.send({
                err: -2,
                mesg: '验证码失效'
            });
        }
        //确认后插入用户信息
        smsArr.some((obj, index) => {
            // 验证码未失效
            if (obj.tel == tel) {
                // 测试用的9999999
                // 如果验证码正确
                if (obj.code == sms) {
                    insert('users', {
                        username,
                        password,
                        tel,
                        emil
                    }, db);
                    // 删掉内存验证数据
                    smsArr.splice(index, 1);
                    res.send({
                        err: 0,
                        mesg: '注册成功'
                    });
                } else {
                    //不正确 
                    res.send({
                        err: -1,
                        mesg: '验证码不正确'
                    });
                }
                return true;
            } else {
                // 验证码失效
                res.send({
                    err: -2,
                    mesg: '验证码失效'
                });
            }
        });
    })();
})

// 检测用手机号
router.get('/checktel', (req, res) => {
    let { tel } = req.query;
    (async () => {
        let db = await connect();
        let result = await find('users', { tel }, db);
        result ? res.send({
            err: -1,
            mesg: '改手机号已存在'
        }) : res.send({
            err: 0,
            mesg: '该手机号可用'
        });
    })();
});

// 发送邮件验证
router.post('/sendEmil', (req, res) => {
    let { tel, emil } = req.body;
    // 发送验证码
    let code = parseInt(Math.random() * 1000000) + '';
    // 暂存验证数据
    smsArr.push({
        tel,
        code
    });
    send({
        from: '<823550847@qq.com>',
        subject: '【验证码】',
        to: `${emil}`,
        text: `【meituan验证码】${code},该验证码在5分钟内有效。` //可以是链接，也可以是验证码
    })
    console.log(smsArr);
    res.send({
        err: 0,
        code,
        mesg: '验证码发送成功！'
    });
});

module.exports = router;
