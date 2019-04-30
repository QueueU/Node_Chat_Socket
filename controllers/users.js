'use strict';

module.exports = function (_, passport, User) {

    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            //            router.get('/home',this.homePage);    
            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback', this.facebookLogin);
            router.post('/', this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignup);
            router.get('/auth/google', this.getGoogleLogin);
            router.get('/auth/google/callback', this.googleLogin);

        },

        postLogin: passport.authenticate('local.login', {

            successRedirect: '/home',
            failurRedirect: '/',
            failurFlash: true
        }),




        indexPage: function (req, res) {
            return res.render('index', { test: 'this is test' });
        },

        getSignUp: function (req, res) {

            const errors = req.flash('error');
            //console.log("length"+errors.length);

            return res.render('signup', { title: 'Footballkk | SignUp', messages: errors, hasErrors: errors.length > 0 });
        },
        getGoogleLogin: passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login']
        }), getFacebookLogin: passport.authenticate('facebook', {
            scope: 'email'
        }),
        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        googleLogin: passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        postSignup: passport.authenticate('local.signup', {

            successRedirect: '/home',
            failurRedirect: '/signup',
            failurFlash: true
        }, console.log("get")),

        /*
        postSignup : function(req,res)
        {
                console.log(req.body.username);
                
        }, */




    }
}