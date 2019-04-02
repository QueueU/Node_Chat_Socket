
module.exports = function(async,Club,_){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
            
        },

        homePage: function(req,res)
        {
          async.parallel([
              function(Callback){
                  Club.find({},(err,result) => {
                      Callback(err,result);
                  })
              }

          ],(err,result) => {
              const res1=result[0];
              console.log(res1);
              res.render('home',{title:'Footballkik -Home',data:res1})
          })
        }
    }

    console.log("At Home Controller");
    }