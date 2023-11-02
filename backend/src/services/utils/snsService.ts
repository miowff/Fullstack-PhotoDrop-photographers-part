import AWS from "aws-sdk";
import getEnv from "./getEnv";

class SnsService {
  private readonly snsClient = new AWS.SNS();
  addPhotosUploadedEvent = async (phoneNumbers: string[]) => {
    const params = {
      Message: JSON.stringify(phoneNumbers),
      TopicArn: `arn:aws:sns:${getEnv("AWS_ACCOUNT_ID")}:photosUploadedAlerts`,
    };
    await this.snsClient.publish(params).promise();
  };
}

export const snsService = new SnsService();
