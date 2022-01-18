// const cloudinary = require('cloudinary').v2;
// import cloudinary from "cloudinary"

// cloudinary.config({
//   cloud_name: "dci8tsnsb",
//   api_key: "151997795543683",
//   api_secret: "8w-vyoKRhZfCfSRwruT-DBjDCeA",
// });

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

// const streamUpload = (file, options = {}) => {
//     return new Promise((resolve, reject) => {
//       let uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });
//       streamifier.createReadStream(file.buffer).pipe(uploadStream);
//     });
//   };
  
//   export const uploadPhoto = async (file, options = {}) => {
//     const defaultOptions = {
//       folder: 'media',
//       quality: 'auto',
//       fetch_format: 'auto',
//     };
//     const imageOptions = Object.assign({}, defaultOptions, options);
  
//     const results = await streamUpload(file, imageOptions);
//     return results;
//   };
  
  