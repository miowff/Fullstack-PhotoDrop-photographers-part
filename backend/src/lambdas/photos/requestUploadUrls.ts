import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { albumsService } from "src/services/albumsService";

import responseCreator from "src/services/utils/responseCreator";
import { s3Service } from "src/services/utils/s3Service";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { photosData, albumId } = JSON.parse(event.body);
    const { title: albumTitle } = await albumsService.getById(albumId);
    const urls = await s3Service.createPreSignedPostUrls(
      photosData,
      albumTitle
    );
    return responseCreator.default(JSON.stringify(urls), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
