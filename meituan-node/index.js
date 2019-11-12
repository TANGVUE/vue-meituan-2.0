const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { connect } = require('./db/conn');


app.use(bodyparser.urlencoded({ extended: true }));

// 路由
const userRouter = require('./router/userRouter');
const shopRouter = require('./router/shopRouter');
const goodsRouter = require('./router/goodsRouter');
const addressRouter = require('./router/addressRouter');
const orderRouter = require('./router/orderRouter');

app.all('*', (req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/user', userRouter);
app.use('/shop', shopRouter);
app.use('/goods', goodsRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);

(async () => {
    let db = await connect();
    if (db) {
        console.log('db connect...');
    }
})();


app.listen(3000, () => {
    console.log('server is running...');
})

