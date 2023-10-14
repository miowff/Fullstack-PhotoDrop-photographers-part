export interface PresignedUrl {
  url: string;
  fields: Fields;
}

interface Fields {
  Key: string;
  ContentType: string;
  bucket: string;
  "X-Amz-Algorithm": string;
  "X-Amz-Credential": string;
  "X-Amz-Date": string;
  "X-Amz-Security-Token": string;
  Policy: string;
  "X-Amz-Signature": string;
}
