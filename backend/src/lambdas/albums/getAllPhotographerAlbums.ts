import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { photographerId } = event.requestContext.authorizer?.lambda;
    const albums = await albumsService.getAllPhotographerAlbums(photographerId);
    return responseCreator.default(JSON.stringify(albums), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
