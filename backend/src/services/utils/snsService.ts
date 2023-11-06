import AWS from "aws-sdk";
class SnsService {
  private readonly snsClient = new AWS.SNS({ region: "us-east-1" });
  addPhotosUploadedEvent = async (phoneNumbers: string[]) => {
    const params = {
      Message: JSON.stringify(phoneNumbers),
      TopicArn: `arn:aws:sns:us-east-1:667001376908:photosUploadedAlerts`,
    };
    await this.snsClient.publish(params).promise();
  };
}

export const snsService = new SnsService();
