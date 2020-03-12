const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const bodyParser = require( 'body-parser' );
const path = require("path");
const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

const s3 = new aws.S3({
  accessKeyId: "AKIA2OZMLA5KKCOZ4YMX",
  secretAccessKey: "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",
  Bucket: "books-admin-bucket/books-images"
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "books-admin-bucket/books-images",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, 
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("profileImage");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// router.post('/profile-img-upload', (req, res,next) => {
//   profileImgUpload(req, res, (error) => {
//     if (error) {
//       console.log('errors', error);
//       res.json({ error: error });
//     } else {
//       if (req.file === undefined) {
//         console.log('Error: No File Selected!');
//         res.json('Error: No File Selected');
//       } else {
//         // const imageName = req.file.key;
//         // const imageLocation = req.file.location;
//         // const newThumb = new Thumb ({
//         //   url: imageLocation
//         // });
//         // newThumb.save().then((resp)=>{
//         //   res.send(resp.data)
//         // }).catch(function(err){
//         //   res.send(err)
//         // })
//       }
//     }
//   });
// });

function uploadFileToAWS(req, res, next) {


  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        next()
        // const imageName = req.file.key;
        // const imageLocation = req.file.location;
        // const newThumb = new Thumb ({
        //   url: imageLocation
        // });
        // newThumb.save().then((resp)=>{
        //   res.send(resp.data)
        // }).catch(function(err){
        //   res.send(err)
        // })
      }
    }
  });

}


module.exports = uploadFileToAWS