
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
              //console.log(res1);

              const dataChunk = [];
              const chunkSize =3;

              for(let i=0;i<res1.length;i+=chunkSize)
              {
                  dataChunk.push(res1.slice(i,i+chunkSize));
              }
              console.log(dataChunk);

              res.render('home',{title:'Footballkik -Home',data:dataChunk})
          })
        }
    }

    console.log("At Home Controller");
    }