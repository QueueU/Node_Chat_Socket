'use strict';

module.exports = function () {
    return {
        SignUpValidation: (req, res, next) => {
            req.checkBody('username', 'Username is Required').notEmpty();
            req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({ min: 5 });
            req.checkBody('email', 'Email is Required').notEmpty();
            req.checkBody('email', 'Email is Invalid').isEmail();
            req.checkBody('password', 'Password is Required').notEmpty();
            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 });
            /*
            
            req.getValidationResult()
            .then((result) => {
                const errors = result.array();
                const messages = [];
               
                errors.forEach((error) => {
                    messages.push(error.msg);
                    console.log(error.msg);
                });
               
            
                req.flash('error', messages);
                res.redirect('/signup');
            })
            .catch((err) => {
                return next();
            })

        

*/
       
            req.getValidationResult().then(function (result) {
                const { msg } = result;
                console.log(result);
                if (msg != undefined) {
                    console.log(msg);
                    
                   
                    //return;
                } else {
                    console.log('Validation Ok');
                    return next();
                }
            });
                 
            }

      
      
    }
    }
