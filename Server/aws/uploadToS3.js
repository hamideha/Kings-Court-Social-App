var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const uploadFile = async (file) => {
    const { createReadStream, filename, mimetype } = file
    const fileStream = createReadStream()

    const uploadParams = { Bucket: 'kc-app-chat-images', Key: `ChatImages/${filename}`, Body: fileStream, ContentType: mimetype };
    if (!['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(mimetype)) return new Error("Invalid File Type")
    const result = await s3.upload(uploadParams).promise()

    return { ...file, url: result.Location };
}

module.exports.uploadToS3 = uploadFile