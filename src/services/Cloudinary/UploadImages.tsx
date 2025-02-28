// import { v2 as cloudinary } from "cloudinary";

const urllist = [
  'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',

'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg'
]
const Test = async():Promise<string> => {
  
  const test = urllist[0]
  return new Promise<string>((resolve) => {
    resolve(test)
  })
}
export default Test

export const UploadImages = async(base64_array:string[]):Promise<string[]> => {
  // const uploadUrls: string[] = [];

  // const fileToGenerativeResp = async (url: string) => {
  //   const response = await fetch(url);
  //   return response.arrayBuffer();
  // };

  const base64ToApi = async() => {
    try {
      const res = await fetch("https://ducvan-backend.onrender.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64_array: base64_array,

        }),
      });

      const data = await res.json();
      // console.log(data)
      return data
    } catch (error) {
      const data = error
      return data
    }
    
  }
  console.log(base64ToApi())
  return new Promise<string[]>((resolve, reject) => {
    resolve(base64ToApi())
    reject('False')
  })
}

// export const UploadImages = async (images_list: string[]): Promise<string[]> => {
//   // cloudinary.config({
//   //   // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   //   // api_key: process.env.CLOUDINARY_API_KEY,
//   //   // api_secret: process.env.CLOUDINARY_API_SECRET,
//   //   cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME',
//   //   api_key: 'process.env.CLOUDINARY_API_KEY',
//   //   api_secret: 'process.env.CLOUDINARY_API_SECRET',
//   // });

//   const uploadUrls: string[] = [];

//   const fileToGenerativeResp = async (url: string) => {
//     const response = await fetch(url);
//     return response.arrayBuffer();
//   };

//   for (const url of images_list) {
//     try {
//       const data_buffer = Buffer.from(await fileToGenerativeResp(url)).toString("base64");
//       const imagePart = `data:image/jpg;base64,${data_buffer}`;

//       const uploadResponse = await cloudinary.uploader.upload(imagePart, {
//         folder: "uploads",
//       });

//       uploadUrls.push(uploadResponse.secure_url);
//     } catch (error) {
//       console.error("Upload failed for:", url, error);
//       uploadUrls.push(""); // Add an empty string for failed uploads
//     }
//   }

//   return uploadUrls;
// };


