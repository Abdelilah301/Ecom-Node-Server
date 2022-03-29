const express = require('express');
//Middleware Function already available
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');


const app = express();

// use app.use whenever you want to parse a middleware in our project
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['zaea5636frfyh']
})
);
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);


// the 3000 is the port that we want to lunch our application on our browser machine 
app.listen(3000, () => {
    console.log('listening');
});


