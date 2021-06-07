import Aws from 'aws-sdk';

const config = {
    accessKeyId:  process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
};

const params = {
    Bucket: AWS_BUCKET,
};

// export const UploadToAws = async () => {
    
// }