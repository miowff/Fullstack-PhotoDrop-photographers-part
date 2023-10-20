import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CreateAlbumModel } from "src/db/entities/album";
import { albumsService } from "src/services/albumsService";

import responseCreator from "src/services/utils/responseCreator";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { photographerId } = event.requestContext.authorizer?.lambda;
    const createAlbumRequest = JSON.parse(event.body) as CreateAlbumModel;
    const newAlbum = await albumsService.createNewAlbum(
      createAlbumRequest,
      photographerId
    );
    return responseCreator.default(JSON.stringify(newAlbum), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
