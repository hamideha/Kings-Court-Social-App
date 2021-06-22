import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;