'use strict';

module.exports=function(_,passport){

    return {
        SetRouting :function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.get('/home',this.homePage);    


            router.post('/signup',this.postSignup);

        },

        indexPage: function (req,res)
        {
            return res.render('index',{test:'this is test'});
        },

        getSignUp: function(req,res)
        {   
            
                return res.render('signup');
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