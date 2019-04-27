
module.exports = function(async,Club,_,Users){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
            router.post('/home',this.postHomePage);
            
        },

        homePage: function(req,res)
        {
          async.parallel([
              function(Callback){
                  Club.find({},(err,result) => {
                      Callback(err,result);
                  })
              },
              
           
            function(callback){
                Users.findOne({'username': req.user.username})
                    .populate('request.userId')
                    .exec((err, result) => {
                        callback(err, result);
                    })
            }
             
            

          ],(err,result) => {
              const res1=result[0];
             //const res2=result[1];
             const res3=result[1];

              const dataChunk = [];
              const chunkSize =3;

              for(let i=0;i<res1.length; i+=chunkSize)
              {
                  dataChunk.push(res1.slice(i,i+chunkSize));
              }
              console.log(dataChunk);

              res.render('home',{title:'Footballkik -Home',user:req.user,chunks:dataChunk,data:res3});
          })
        },

        postHomePage:function(req,res){
            async.parallel([

                    function(callback){
                        Club.update({
                            '_id':req.body.id,
                            'fans.username':{$ne: req.user.username}
                        },{
                            $push:{fans:{
                                username:req.user.username,
                                email:req.user.email
                            }}
                        } ,(err,count) => {
                            console.log("//////////////////////",count);
                            callback(err,count);
                        });
                    }

            ],(err,result) => {
                res.redirect('/home');
            });
        }
    }

   // console.log("At Home Controller");
    }