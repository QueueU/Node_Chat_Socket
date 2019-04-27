const AWS = require('aws-sdk');
const multer =require('multer');
const multerS3 = require('multer-s3');


AWS.config.update({
    accessKeyId:'',
    secretAccessKey:'',
    region:'us-east-2'
});

const s0 = new AWS.S3({});

s0.listBuckets(function(err,data){
    if(err){
        console.log(err);
    }
    else
    {
        console.log("List bucket" ,data.Buckets);
    }
});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'nodechataws',
        acl: 'public-read',
        metadata: function(req, file, cb){
           // console.log("yess",file.fieldname);
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
           // console.log("NOOOO",file.originalname);
            cb(null, file.originalname);
        }
    }),

    rename: function (fieldname, filename) {

       // console.log("here name of file ",filename.replace(/\W+/g, '-').toLowerCase());
        return filename.replace(/\W+/g, '-').toLowerCase();
        
    }
})

exports.Upload = upload;