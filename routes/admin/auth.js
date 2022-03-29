const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireEmailSignin,
    requirePasswordSignin
} = require('./validators');
const router = express.Router();
const signinTemplate = require('../../views/admin/auth/signin');

// req is the request that we send to the node server
// res is the response that we get from the node server
// POST request is a typeof httpRequest that is commonly associated with creating a record of some kind(like in our case create a user account or upload image ...etc).
// with POST Method inside form we override the get method with POST
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});
// Middleware is a function that does some pre-process on the 'req' and the ' resp objects. its a Primary means of code reuse in code Express 
// bodyParser is the middleware function.

router.post('/signup',
    // to use the express-validator library we need to install it and required it and call the check function from the library
    [requireEmail, requirePassword, requirePasswordConfirmation],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body;
        //Create a user in our user repo to represent this person 
        const user = await usersRepo.create({ email, password });

        // Store the id of that user inside the users cookie
        // its recomended to use outside library to manage cookies 
        req.session.userId = user.id;

        res.redirect('/admin/products');
    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('YOU R LOGGED OUT')
});

router.get('/signin', (req, res) => {

    res.send(signinTemplate({}))
});

router.post('/signin',
    [requireEmailSignin, requirePasswordSignin],
    handleErrors(signinTemplate),
    async (req, res) => {
        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email: email });

        req.session.userId = user.id;

        res.redirect('/admin/products');
    });

module.exports = router;
