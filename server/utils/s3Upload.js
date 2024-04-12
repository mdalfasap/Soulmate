import AWS from 'aws-sdk'
import fs from 'fs';

// Set the region and access keys
AWS.config.update({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRETACCESS
});

const s3 = new AWS.S3();

export const uploadFileToS3 = (file, folderName, fileName) => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${fileName}`,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
        ACL: 'public-read'
      };
  
      s3.upload(params, (err, data) => {
        if (err) {
          console.log('Error uploading file:', err);
          reject(err);
        } else {
          console.log('File uploaded successfully. File locationn:', data.Location);
          resolve(data.Location);
        }
      });
    });
  };
  export const deleteObjectFromS3 = async (userId, s3Key) => { // Pass userId and s3Key
    try {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${userId}/${s3Key}`, // Construct the correct key
      };
      await s3.deleteObject(params).promise(); // Use promise() to make it async/await compatible
      console.log('Object deleted from S3:', s3Key);
      return { message: 'Object deleted from S3' };
    } catch (error) {
      console.error('Error deleting object from S3:', error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  }