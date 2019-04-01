module.exports = function (formidable,Club,aws){
    return {
        SetRouting: function(router){
            router.get('/dashboard',this.adminPage);
            router.post('/uploadFile',aws.Upload.any(),this.uploadFile);
            router.post('/dashboard',this.adminPostPage);   
        },

        adminPostPage: function(req,res)
        {
            console.log("here from adminpostPage");
            const newClub = new Club();
            console.log("here2");
            newClub.name = req.body.club;
            newClub.country = req.body.country;
            newClub.image = req.body.upload;
           // newClub.fan=[];
            console.log("name",newClub.name);
            console.log(newClub.country);
            console.log(newClub.image);

            newClub.save((err) => {
                console.log("err",err);
               // done(null,newClub);
                res.render('admin/dashboard');
            })
        },
        adminPage : function(req,res)
        {
            res.render('admin/dashboard');
        },

        uploadFile: function(req,res)
        {
            const form =new formidable.IncomingForm();
            
            form.on('file',(field,file) =>{

            });

            form.on('error',(err) => {

            });

            form.on('end',() =>{
            });

            form.parse(req);
           // this.adminPostPage;
            console.log("here at This.uploading Function");
        }
    }
}