'use strict';

module.exports=function(_,passport,User){

    return {
        SetRouting :function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.get('/home',this.homePage);    


            router.post('/signup',User.SignUpValidation,this.postSignup);

        },

        indexPage: function (req,res)
        {
            return res.render('index',{test:'this is test'});
        },

        getSignUp: function(req,res)
        {   
            
            const errors = req.flash('error');
            console.log(errors.length);
           
            return res.render('signup', {title: 'Footballkk | SignUp', messages: errors, hasErrors: errors.length > 0});
        },
        
        postSignup:passport.authenticate('local.signup',{
            
            successRedirect : '/home',
            failurRedirect:'/signup',
            failurFlash:true
        },console.log("get")), 

        /*
        postSignup : function(req,res)
        {
                console.log(req.body.username);
                
        }, */

        homePage : function(req,res)
        {
            
            return res.render('home');
        }


    }
}