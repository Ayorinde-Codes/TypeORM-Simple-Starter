const path = require('path');
const multer = require('multer');
const helpers = require('../helpers/helper');



 let storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'uploads');    
    }, 
    filename: function (req, file, cb) { 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
 });

export const uploadUserImageMiddleware = multer({storage:storage,
    limits : {fileSize : 1000000}, 
    fileFilter: helpers.imageFilter}
    ).single("photo");


