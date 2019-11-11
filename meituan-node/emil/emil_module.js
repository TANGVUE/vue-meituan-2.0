// 引入 nodemailer
var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.qq.com',//网易163邮箱 smtp.163.com
    port: 465,//网易邮箱端口 25
    auth: {
        user: '823550847@qq.com', //邮箱账号
        pass: 'xplibwwrcddcbcdb'  //邮箱的授权码
    }
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 发送邮件
function send(mail) {
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};


module.exports = {
    send
}