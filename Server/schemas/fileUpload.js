const { gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const { uploadToS3 } = require('../aws/uploadToS3')
const fs = require('fs');

module.exports.fileUploadTypeDef = gql`
scalar Upload
type File {
    success: Boolean!
    filename: String
    url: String
    mimetype: String
    encoding: String
}
extend type Mutation {
  singleUpload(file: Upload!): File!,
}
`;

module.exports.fileUploadResolver = {
    Upload: GraphQLUpload,
    Mutation: {
        singleUpload: async (obj, args) => {
            const file = await args.file
            return uploadToS3(file)
        },
    }
}